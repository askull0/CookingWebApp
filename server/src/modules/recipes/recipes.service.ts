import { Injectable } from '@nestjs/common';
import { CreateRecipesDto } from './dto/create-recipes.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecipesService {
  today = new Date();

  constructor(private readonly prisma: PrismaService) {}

  async findAllRecipes() {
    return this.prisma.recipes.findMany({});
    // return [
    //   {
    //     id: 2,
    //     name: 'test',
    //     rating: 3,
    //     reviews: 45,
    //     description: 'testowy test testu testowego',
    //     date: this.today,
    //     totalTime: 30,
    //     calories: 139,
    //     fat: 67,
    //     carbs: 56,
    //     protein: 46,
    //   },
    // ];
  }

  getById(id: number) {
    return this.prisma.recipes.findUnique({
      where: { id: id },
    });
  }

  async createNewRecipe(data: CreateRecipesDto) {
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
      },
    });
  }
}
