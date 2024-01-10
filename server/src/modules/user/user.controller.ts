import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { UserID } from '../auth/decorators/userdId.decorator';
import { TokenGuard } from '../auth/guards/token.guard';

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
}
