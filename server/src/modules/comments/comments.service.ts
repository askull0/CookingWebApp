import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getByUser(id: number) {
    return this.prisma.comment.findMany({
      where: { authorId: id },
      select: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        text: true,
        authorId: true,
        recipesId: true,
        publishedDate: true,
      },
    });
  }
  async getByRecipe(id: number) {
    return this.prisma.comment.findMany({
      where: { recipesId: id },
      select: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        text: true,
        authorId: true,
        recipesId: true,
        publishedDate: true,
      },
    });
  }

  async addComment(data: CreateCommentDto) {
    const recipe = await this.prisma.recipes.findUnique({
      where: { id: data.recipesId },
    });
    if (!recipe) return recipe;

    return this.prisma.comment.create({
      data: {
        text: data.text,
        authorId: data.authorId,
        recipesId: data.recipesId,
      },
    });
  }

  async deleteComment(id: number) {
    const commment = await this.prisma.comment.findUnique({
      where: { id: id },
    });
    if (!commment) return null;
    else return this.prisma.comment.delete({ where: { id: id } });
  }
}
