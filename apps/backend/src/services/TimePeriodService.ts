import { BadRequestException, Injectable } from '@nestjs/common';
import {
  TimePeriodCreateDto,
  TimePeriodUpdateDto,
} from '@/utils/dtos/TimePeriodDto';
import { TimePeriodRepository } from '@/repositories/TimePeriodRepository';

@Injectable()
export class TimePeriodService {
  public constructor(
    private readonly timePeriodRepository: TimePeriodRepository,
  ) {}

  public async createTimePeriod(data: TimePeriodCreateDto) {
    return this.timePeriodRepository.createTimePeriod(data);
  }

  public async getTimePeriodById(id: number) {
    return this.timePeriodRepository.getTimePeriodById(id);
  }

  public async getAllTimePeriod() {
    return this.timePeriodRepository.getAllTimePeriod();
  }

  public async updateTimePeriodById(id: number, data: TimePeriodUpdateDto) {
    if (Object.keys(data).length === 0)
      throw new BadRequestException('No data that want to update');

    const values: string[] = [];
    const updateQuery = Object.keys(data)
      .map((key) => {
        values.push(data[key]);
        return `${key} = ?`;
      })
      .join(', ');

    await this.timePeriodRepository.updateTimePeriodById(
      updateQuery,
      values,
      id,
    );
  }

  public async deleteTimePeriodById(id: number) {
    return this.timePeriodRepository.deleteTimePeriodById(id);
  }
}
