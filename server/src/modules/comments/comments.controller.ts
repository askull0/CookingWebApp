import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RecipeNotfoundException } from '../../exceptions/recipe-notfound-exception';
import { CommentsService } from './comments.service';
import { plainToInstance } from 'class-transformer';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  // jesli user nie ma komentarzy lub id usera niepoprawne to zwraca not found
  @Get('user/:id')
  async findByUser(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.getByUser(id);
    if (comment.length == 0) throw new NotFoundException();
    return comment;
  }

  @Get('recipe/:id')
  async findByRecipe(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.getByRecipe(id);
    if (comment.length == 0) throw new NotFoundException();
    return comment;
  }

  @Post('')
  async commentRecipe(@Body() data: CreateCommentDto) {
    const recipe = await this.commentService.addComment(data);
    if (!recipe) throw new RecipeNotfoundException();
    return plainToInstance(CreateCommentDto, recipe);
  }

  @Delete(':id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.deleteComment(id);
    if (!comment) throw new NotFoundException();
    return comment;
  }
}
