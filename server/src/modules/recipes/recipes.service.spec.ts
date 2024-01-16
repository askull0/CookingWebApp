import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';

describe('RecipesService', () => {
  let service: RecipesService;
  let prisma: DeepMockProxy<PrismaClient>;

  const mockRecipes = [
    {
      id: 0,
      name: 'test1',
      rating: 0,
      reviews: 0,
      description: 'tester tester',
      date: Date.now(),
      totalTime: 0,
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    {
      id: 1,
      name: 'test1',
      rating: 1,
      reviews: 1,
      description: 'tester tester',
      date: Date.now(),
      totalTime: 1,
      calories: 1,
      fat: 1,
      carbs: 1,
      protein: 1,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<RecipesService>(RecipesService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findAllRecipes', () => {
  //   it('should return an array of recipes', async () => {
  //     prisma.user.findMany.mockResolvedValueOnce(mockRecipes);
  //
  //     const result = await service.findAllRecipes();
  //     expect(result).toEqual(mockRecipes);
  //     expect(prisma.recipes.findMany).toHaveBeenCalled();
  //   });
  // });
});
