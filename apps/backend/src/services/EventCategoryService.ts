import { Injectable } from '@nestjs/common';
import { EventCategoryRepository } from '@/repositories/EventCategoryRepository';
import {
  EventCategoryCreateDto,
  EventCategoryUpdateDto,
} from '@/utils/dtos/EventCategoryDto';

@Injectable()
export class EventCategoryService {
  public constructor(
    private readonly eventCategoryRepository: EventCategoryRepository,
  ) {}

  public async createEventCategory(data: EventCategoryCreateDto) {
    return this.eventCategoryRepository.createEventCategory(data);
  }

  public async getEventCategoryById(id: number) {
    return this.eventCategoryRepository.getEventCategoryById(id);
  }

  public async getAllEventCategory() {
    return this.eventCategoryRepository.getAllEventCategory();
  }

  public async updateEventCategoryById(
    id: number,
    data: EventCategoryUpdateDto,
  ) {
    return this.eventCategoryRepository.updateEventCategoryById(id, data);
  }

  public async deleteEventCategoryById(id: number) {
    return this.eventCategoryRepository.deleteEventCategoryById(id);
  }
}
