import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/repositories/DashboardRepository';

@Injectable()
export class DashboardService {
  public constructor(
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  public async getAllOrderByDate() {
    return this.dashboardRepository.getAllOrderByDate();
  }

  public async getAllOrderWithCountWithHourByDate() {
    return this.dashboardRepository.getAllOrderWithCountWithHourByDate();
  }

  public async getLatestOrderByCount(count: number) {
    return this.dashboardRepository.getLatestOrderByCount(count);
  }

  public async getBooksWithCount(count: number) {
    return this.dashboardRepository.getBooksWithCount(count);
  }

  public async getLatestBooks(count: number) {
    return this.dashboardRepository.getLatestBooks(count);
  }

  public async getAllBlogs() {
    return this.dashboardRepository.getAllBlogs();
  }

  public async getBlogsWithCount(count: number) {
    return this.dashboardRepository.getBlogsWithCount(count);
  }

  public async getAllEvent() {
    return this.dashboardRepository.getAllEvent();
  }

  public async getLatestEvent(count: number) {
    return this.dashboardRepository.getLatestEvent(count);
  }

  public async getEventsWithCount(count: number) {
    return this.dashboardRepository.getEventsWithCount(count);
  }

  public async getRoomsWithCount(count: number) {
    return this.dashboardRepository.getRoomsWithCount(count);
  }
}
