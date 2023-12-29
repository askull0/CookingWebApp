import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [RecipesService],
  controllers: [RecipesController],
  imports: [PrismaModule],
})
export class RecipesModule {}
