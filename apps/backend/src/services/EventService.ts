import { BadRequestException, Injectable } from '@nestjs/common';
import { EventRepository } from '@/repositories/EventRepository';
import {
  EventAddCategoryDto,
  EventCreateDto,
  EventUpdateDto,
  EventUpdateImageDto,
} from '@/utils/dtos/EventDto';
import { EventCategoryRepository } from '@/repositories/EventCategoryRepository';
import { ImageService } from '@/services/ImageService';
import { EventMemberRepository } from '@/repositories/EventMemberRepository';
import { EventWithCategories } from 'api-schema';

@Injectable()
export class EventService {
  public constructor(
    private readonly imageService: ImageService,
    private readonly eventRepository: EventRepository,
    private readonly eventCategoryRepository: EventCategoryRepository,
    private readonly eventMemberRepository: EventMemberRepository,
  ) {}

  public async createEvent(data: EventCreateDto) {
    const imageDefault = this.imageService.defaultImagePath('events');

    await this.eventRepository.createEvent({ ...data, image: imageDefault });

    const categories = await this.eventCategoryRepository.getAllEventCategory();

    const categoriesName = categories.map((category) => category.name);

    const eventValues: string[] = [];
    const eventQuery = data.categories
      .filter((category) => {
        return !categoriesName.includes(category);
      })
      .map((category) => {
        eventValues.push(category);
        return '(?)';
      })
      .join(', ');

    const latestEvent = await this.eventRepository.getLatestEvent();

    const imagePath = this.imageService.saveImageFromBase64(
      data.image,
      'events',
      `${latestEvent.id}.png`,
    );

    await this.eventRepository.updateEventImageById(latestEvent.id, {
      image: imagePath,
    });

    if (eventValues.length > 0) {
      await this.eventCategoryRepository.createManyEventCategories(
        eventQuery,
        eventValues,
      );
    }

    const categoryValues: any[] = [];
    const categoryQuery = data.categories
      .map((cat) => {
        categoryValues.push(latestEvent.id, cat);
        return `(?, (SELECT id FROM EventCategory WHERE name = ?))`;
      })
      .join(', ');

    await this.eventCategoryRepository.createEventEventCategory(
      categoryQuery,
      categoryValues,
    );
  }

  public async addCategoryById(bookId: number, data: EventAddCategoryDto) {
    await this.eventCategoryRepository.createEventCategory(data);

    await this.eventCategoryRepository.createEventEventCategory(
      '(?, (SELECT id FROM EventCategory WHERE name = ?))',
      [bookId, data.name],
    );
  }

  public async addMemberById(eventId: number, userId: string) {
    return this.eventMemberRepository.createEventMember(eventId, userId);
  }

  public async getAllEvent(): Promise<EventWithCategories[]> {
    const events = await this.eventRepository.getAllEvent();
    const eventsWithCategories: EventWithCategories[] = [];

    for (const event of events) {
      const categories =
        await this.eventCategoryRepository.getAllEventCategoryByEventId(
          event.id,
        );

      eventsWithCategories.push({
        ...event,
        categories,
      });
    }

    return eventsWithCategories;
  }

  public async getEventWithCategoriesById(
    id: number,
  ): Promise<EventWithCategories> {
    const event = await this.eventRepository.getEventById(id);

    const categories =
      await this.eventCategoryRepository.getAllEventCategoryByEventId(id);

    const eventWithCategories = {
      ...event,
      categories,
    };

    return eventWithCategories;
  }

  public async getMemberById(eventId: number, userId: string) {
    return this.eventMemberRepository.getMemberById(eventId, userId);
  }

  public async getAllMemberByEventId(eventId: number) {
    return this.eventMemberRepository.getAllMemberByEventId(eventId);
  }

  public async getAllUserByEventId(eventId: number) {
    return this.eventMemberRepository.getAllUserByEventId(eventId);
  }

  public async getEventById(id: number) {
    return this.eventRepository.getEventById(id);
  }

  public async getEventWithCategoryById(eventId: number, categoryId: number) {
    return this.eventRepository.getEventWithCategoryById(eventId, categoryId);
  }

  public async updateEventById(id: number, data: EventUpdateDto) {
    if (Object.keys(data).length === 0)
      throw new BadRequestException('No data that want to update');

    const values: any[] = [];
    const updateQuery = Object.keys(data)
      .map((key) => {
        values.push(data[key]);
        return `${key} = ?`;
      })
      .join(', ');

    await this.eventRepository.updateEventById(updateQuery, values, id);
  }

  public async updateEventImageById(id: number, data: EventUpdateImageDto) {
    const imagePath = this.imageService.saveImageFromBase64(
      data.image,
      'events',
      `${id}.png`,
    );

    await this.eventRepository.updateEventImageById(id, { image: imagePath });
  }

  public async deleteEventById(id: number) {
    await this.eventRepository.deleteEventById(id);

    this.imageService.deleteImageFromName('events', `${id}.png`);
  }

  public async deleteCategoryFromEventById(
    eventId: number,
    categoryId: number,
  ) {
    return this.eventRepository.deleteCategoryFromEventById(
      eventId,
      categoryId,
    );
  }

  public async deleteMemberFromEventById(eventId: number, userId: string) {
    return this.eventMemberRepository.deleteEventMemberById(eventId, userId);
  }
}
