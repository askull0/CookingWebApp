import { Injectable } from '@nestjs/common';
import { CreateRecipesDto } from './dto/create-recipes.dto';

@Injectable()
export class RecipesService {
  today = new Date();
  findAllRecipes() {
    return [
      {
        id: 2,
        name: 'test',
        rating: 3,
        reviews: 45,
        description: 'testowy test testu testowego',
        date: this.today,
        totalTime: 30,
        calories: 139,
        fat: 67,
        carbs: 56,
        protein: 46,
      },
    ];
  }

  createNewRecipe(data: CreateRecipesDto) {
    return 'Recipe added successfully';
  }
}
