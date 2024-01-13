import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UserExistsExepction } from '../../exceptions/user-exists-exepction';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async isEmailUnique(email: string): Promise<boolean> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    return existingUser == null; //=> if(existingUser == null)  return true;   else  return false;
  }

  async create(createUserDto: CreateUserDto) {
    const unique = await this.isEmailUnique(createUserDto.email);
    if (unique) {
      const hash = await argon2.hash(createUserDto.password);
      return this.prisma.user.create({
        data: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: hash,
        },
      });
    } else {
      throw new UserExistsExepction();
    }
  }

  findUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findMyRecipes(id: number) {
    return this.prisma.recipes.findMany({ where: { userId: id } });
  }

  async deleteMyRecipe(id: number, userId: number) {
    const recipe = await this.prisma.recipes.findUnique({
      where: { id: id },
    });
    if (!recipe) return null;
    if (recipe.userId == userId) {
      return this.prisma.recipes.delete({ where: { id: id } });
    } else throw new ConflictException();
  }
}
