import { IsNotEmpty } from 'class-validator';

export class RecipesDto {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  date: Date;
  totalTime: number;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}
