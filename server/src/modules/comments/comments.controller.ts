import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RecipeNotfoundException } from '../../exceptions/recipe-notfound-exception';
import { CommentsService } from './comments.service';
import { plainToInstance } from 'class-transformer';
import { TokenGuard } from '../auth/guards/token.guard';
import { UserID } from '../auth/decorators/userdId.decorator';
import { rethrow } from '@nestjs/core/helpers/rethrow';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  // jesli user nie ma komentarzy lub id usera niepoprawne to zwraca not found
  @Get('user')
  @UseGuards(TokenGuard)
  async findByUser(@UserID() id: number) {
    const comment = await this.commentService.getByUser(id);
    // if (comment.length == 0) res.status(HttpStatus.NO_CONTENT).send();
    return comment;
  }

  @Get('recipe/:id')
  async findByRecipe(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.getByRecipe(id);
    // if (comment.length == 0) res.status(HttpStatus.NO_CONTENT).send();
    return comment;
  }

  @Post('')
  @UseGuards(TokenGuard)
  async commentRecipe(
    @Body() data: CreateCommentDto,
    @UserID() userId: number,
  ) {
    const comment = await this.commentService.addComment(data, userId);
    if (!comment) throw new RecipeNotfoundException();
    return plainToInstance(CreateCommentDto, comment);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  async deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @UserID() userId: number,
  ) {
    try {
      const comment = await this.commentService.deleteComment(id, userId);
      if (!comment) throw new NotFoundException();
      return comment;
    } catch (error) {
      rethrow(error);
    }
  }
}
