import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { UserID } from '../auth/decorators/userdId.decorator';
import { TokenGuard } from '../auth/guards/token.guard';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //zwraca stworzonego uzytkownika
  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return plainToInstance(UserDto, user);
    } catch (error) {
      rethrow(error);
    }
  }

  @Get('me')
  @UseGuards(TokenGuard)
  async getMe(@UserID() id: number) {
    const me = await this.userService.findUser(id);
    if (!me) throw new NotFoundException();
    return plainToInstance(UserDto, me);
  }

  @Get('/recipes')
  @UseGuards(TokenGuard)
  async getRecipesByUserId(@UserID() id: number, @Res() res: Response) {
    const recipes = await this.userService.findMyRecipes(id);
    if (recipes.length == 0) res.status(HttpStatus.NO_CONTENT).send();
    return recipes;
  }

  @Delete('recipes/:id')
  @UseGuards(TokenGuard)
  async deleteRecipeById(
    @Param('id', ParseIntPipe) id: number,
    @UserID() userId: number,
  ) {
    try {
      const recipe = await this.userService.deleteMyRecipe(id, userId);
      if (!recipe) throw new NotFoundException();
      return recipe;
    } catch (error) {
      rethrow(error);
    }
  }
}
