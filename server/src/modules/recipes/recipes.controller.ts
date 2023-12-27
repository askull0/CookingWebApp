import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipesDto } from './dto/create-recipes.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}
  @Get()
  getAllRecipes() {
    return this.recipesService.findAllRecipes();
  }

  @Post()
  postRecipe(@Body() data: CreateRecipesDto) {
    return this.recipesService.createNewRecipe(data);
  }
}
