import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipesDto } from './dto/create-recipes.dto';
import { RecipeNotfoundException } from '../../exceptions/recipe-notfound-exception';
import { FilterRecipesDto } from './dto/filter-recipes.dto';
import { RateRecipeDto } from './dto/rate-recipe.dto';

@Controller('api/v1/recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  //zwraca listę (posortowaną, przefiltrowaną lub bez zmian)
  @Get()
  async getRecipes(@Query() filter: FilterRecipesDto) {
    if (Object.keys(filter).length) {
      return this.recipesService.filterRecipes(filter);
    } else return this.recipesService.findAllRecipes();
  }

  // zwraca konkretny przepis po ID
  @Get(':id')
  async getRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipesService.getById(id);
    if (!recipe) throw new RecipeNotfoundException();
    return recipe;
  }

  // zwraca utworzony przepis
  @Post()
  postRecipe(@Body() data: CreateRecipesDto) {
    return this.recipesService.createNewRecipe(data);
  }

  // zwraca zaktualizowany przepis
  @Put('rating/:id')
  async rateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: RateRecipeDto,
  ) {
    const recipe = await this.recipesService.updateRating(id, data);
    if (!recipe) throw new RecipeNotfoundException();
    return recipe;
  }
}
