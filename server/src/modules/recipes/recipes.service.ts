import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipesDto } from './dto/create-recipes.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilterRecipesDto } from './dto/filter-recipes.dto';
import { RateRecipeDto } from './dto/rate-recipe.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Injectable()
export class RecipesService {
  today = new Date();

  constructor(private readonly prisma: PrismaService) {}

  async findAllRecipes() {
    return this.prisma.recipes.findMany({});
  }

  getById(id: number) {
    return this.prisma.recipes.findUnique({
      where: { id: id },
    });
  }

  filterRecipes(filter: FilterRecipesDto) {
    const whereClause: any = {};
    if (filter.search) {
      whereClause.OR = [
        {
          name: {
            contains: filter.search,
          },
        },
        {
          description: {
            contains: filter.search,
          },
        },
      ];
    }

    const orderByClause: any = {};
    if (filter.sortBy && filter.sortOrder) {
      orderByClause[filter.sortBy] = filter.sortOrder;
    }

    return this.prisma.recipes.findMany({
      where: whereClause,
      orderBy: orderByClause,
    });
  }
  async createNewRecipe(data: CreateRecipesDto, id: number) {
    return this.prisma.recipes.create({
      data: {
        name: data.name,
        description: data.description,
        totalTime: data.totalTime,
        calories: data.calories,
        fat: data.fat,
        carbs: data.carbs,
        protein: data.protein,
        rating: 0,
        reviews: 0,
        userId: id,
      },
    });
  }

  async updateRating(id: number, data: RateRecipeDto) {
    const currentRating = await this.prisma.recipes.findUnique({
      where: { id: id },
      select: {
        rating: true,
        reviews: true,
      },
    });

    if (!currentRating) {
      throw new NotFoundException();
    }

    const futureRating: RateRecipeDto = {
      reviews: currentRating.reviews + 1,
      rating: Math.round(
        ((currentRating.rating || 0) * currentRating.reviews + data.rating) /
          (currentRating.reviews + 1),
      ),
    };

    return this.prisma.recipes.update({
      where: {
        id: id,
      },
      data: {
        rating: futureRating.rating,
        reviews: futureRating.reviews,
      },
    });
  }
}
