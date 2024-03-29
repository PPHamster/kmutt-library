import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { CategoryCreateDto, CategoryUpdateDto } from '@/utils/dtos/CategoryDto';

@Injectable()
export class CategoryService {
  public constructor(private readonly categoryRepository: CategoryRepository) {}

  public async createCategory(data: CategoryCreateDto) {
    return this.categoryRepository.createCategory(data);
  }

  public async getCategoryById(id: number) {
    return this.categoryRepository.getCategoryById(id);
  }

  public async getAllCategory() {
    return this.categoryRepository.getAllCategory();
  }

  public async getAllCategoryByBookId(id: number) {
    return this.categoryRepository.getAllCategoryByBookId(id);
  }

  public async getAllCategoryNotInBookById(id: number) {
    return this.categoryRepository.getAllCategoryNotInBookById(id);
  }

  public async updateCategoryById(id: number, data: CategoryUpdateDto) {
    return this.categoryRepository.updateCategoryById(id, data);
  }

  public async deleteCategoryById(id: number) {
    return this.categoryRepository.deleteCategoryById(id);
  }
}
