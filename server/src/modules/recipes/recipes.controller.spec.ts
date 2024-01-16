import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { TokenGuard } from '../auth/guards/token.guard';
import { FilterRecipesDto } from './dto/filter-recipes.dto';
import { RecipeNotfoundException } from '../../exceptions/recipe-notfound-exception';

describe('RecipesController', () => {
  let controller: RecipesController;
  const mockRecipesService = {
    findAllRecipes: jest.fn(() => {
      return [];
    }),
    filterRecipes: jest.fn(() => {
      return [];
    }),
    getById: jest.fn((id: number) => {
      if (id >= 0) return {};
      else return null;
    }),
  };
  const mockTokenGuard = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [RecipesService],
    })
      .overrideProvider(RecipesService)
      .useValue(mockRecipesService)
      .overrideGuard(TokenGuard)
      .useValue(mockTokenGuard)
      .compile();

    controller = module.get<RecipesController>(RecipesController);
  });

  describe('getRecipes', () => {
    it('should return all recipes when no filter is provided', async () => {
      const result = await controller.getRecipes({});
      expect(result).toEqual([]);
      expect(mockRecipesService.findAllRecipes).toHaveBeenCalled();
    });

    it('should return filtered recipes when filter is provided', async () => {
      const filter: FilterRecipesDto = {
        search: 'test',
        sortOrder: 'asc',
        sortBy: 'calories',
      };
      const result = await controller.getRecipes(filter);
      expect(result).toEqual([]);
      expect(mockRecipesService.filterRecipes).toHaveBeenCalledWith(filter);
    });
  });

  describe('getRecipe', () => {
    it('should return a recipe by id', async () => {
      const recipeId = 1;
      const result = await controller.getRecipe(recipeId);
      expect(result).toEqual({});
      expect(mockRecipesService.getById).toHaveBeenCalledWith(recipeId);
    });

    it('should throw RecipeNotFoundException for non-existent recipe', async () => {
      const invalidRecipeId: number = -90;
      await expect(controller.getRecipe(invalidRecipeId)).rejects.toThrow(
        RecipeNotfoundException,
      );
      expect(mockRecipesService.getById).toHaveBeenCalledWith(invalidRecipeId);
    });
  });
});
