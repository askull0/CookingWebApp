import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  //zwracany jest null w przypadku blednego loginu/hasla
  async verifyUser(authDto: AuthDto): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email: authDto.login },
    });

    if (user == null) return null;

    const isValid = await argon.verify(user.password, authDto.password);

    if (!isValid) return null;

    return user;
  }
}
