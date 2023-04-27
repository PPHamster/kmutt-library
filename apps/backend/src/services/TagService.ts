import { Injectable } from '@nestjs/common';
import { TagCreateDto, TagUpdateDto } from '@/utils/dtos/TagDto';
import { TagRepository } from '@/repositories/TagRepository';

@Injectable()
export class TagService {
  public constructor(private readonly tagRepository: TagRepository) {}

  public async createTag(data: TagCreateDto) {
    return this.tagRepository.createTag(data);
  }

  public async getTagById(id: number) {
    const tag = await this.tagRepository.getTagById(id);
    return tag;
  }

  public async getAllTag() {
    return this.tagRepository.getAllTag();
  }

  public async updateTagById(id: number, data: TagUpdateDto) {
    return this.tagRepository.updateTagById(id, data);
  }

  public async deleteTagById(id: number) {
    return this.tagRepository.deleteTagById(id);
  }
}
