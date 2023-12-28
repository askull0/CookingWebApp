import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class RateRecipeDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  reviews: number;
}
