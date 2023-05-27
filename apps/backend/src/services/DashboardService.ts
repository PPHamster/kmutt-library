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
}
