import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetCommentDto {
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsNotEmpty()
  @IsString()
  authorSurname: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  recipesId: number;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsDate()
  publishedDate: Date;
}
