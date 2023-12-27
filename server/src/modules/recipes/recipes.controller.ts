import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipesDto } from './dto/create-recipes.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}
  @Get()
  async getAllRecipes() {
    return this.recipesService.findAllRecipes();
  }

  @Get(':id')
  async getRecipe(@Param('id') id: number) {
    const recipe = await this.recipesService.getById(id);
    if (!recipe) throw new HttpException('Recipe not found', 404);
    return recipe;
  }
  @Post()
  postRecipe(@Body() data: CreateRecipesDto) {
    return this.recipesService.createNewRecipe(data);
  }
}
