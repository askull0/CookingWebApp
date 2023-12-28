import { IsEnum, IsOptional } from 'class-validator';

// pozwala sortowac po podanych nizej kolumnach oraz filtrowac po name i description przepisu
export class FilterRecipesDto {
  @IsOptional()
  @IsEnum(['rating', 'reviews', 'totalTime', 'calories']) // opcjonalnie publishedDate???
  sortBy?: string = 'rating'; // domyslnie sortowanie po rating

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  search?: string;
}

// ? opcjonalne - jesli niezadeklarowane to undefined
