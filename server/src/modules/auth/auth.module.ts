import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TokenModule } from '../token/token.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule, TokenModule],
})
export class AuthModule {}
