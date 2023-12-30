import { Injectable } from '@nestjs/common';
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
}
