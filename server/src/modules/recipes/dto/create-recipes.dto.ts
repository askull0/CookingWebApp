import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRecipesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(75)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(680)
  description: string;

  @IsNotEmpty()
  // TODO @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalTime: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  calories: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  carbs: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  protein: number;
}
