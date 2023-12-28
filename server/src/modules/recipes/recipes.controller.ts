import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipesDto } from './dto/create-recipes.dto';
import { RecipeNotfoundException } from '../../exceptions/recipe-notfound-exception';
import { FilterRecipesDto } from './dto/filter-recipes.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}
  @Get()
  async getRecipes(@Query() filter: FilterRecipesDto) {
    if (Object.keys(filter).length) {
      return this.recipesService.filterRecipes(filter);
    } else return this.recipesService.findAllRecipes();
  }

  @Get(':id')
  async getRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipesService.getById(id);
    if (!recipe) throw new RecipeNotfoundException();
    return recipe;
  }
  @Post()
  postRecipe(@Body() data: CreateRecipesDto) {
    return this.recipesService.createNewRecipe(data);
  }
}
