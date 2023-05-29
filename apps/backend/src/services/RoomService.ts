import { BadRequestException, Injectable } from '@nestjs/common';
import { ImageService } from '@/services/ImageService';
import { RoomRepository } from '@/repositories/RoomRepository';
import { TimePeriodRepository } from '@/repositories/TimePeriodRepository';
import { RoomWithTimePeriods } from 'api-schema';
import {
  BookingRoomCreateDto,
  RoomCreateDto,
  RoomUpdateDto,
  RoomUpdateImageDto,
} from '@/utils/dtos/RoomDto';
import { TimePeriodCreateDto } from '@/utils/dtos/TimePeriodDto';
import { BookingRoomRepository } from '@/repositories/BookingRoomRepository';
import { BookingMemberRepository } from '@/repositories/BookingMemberRepository';

@Injectable()
export class RoomService {
  public constructor(
    private readonly imageService: ImageService,
    private readonly roomRepository: RoomRepository,
    private readonly timePeriodRepository: TimePeriodRepository,
    private readonly bookingRoomRepository: BookingRoomRepository,
    private readonly bookingMemberRepository: BookingMemberRepository,
  ) {}

  private isSameDay(day1: Date, day2: Date): boolean {
    return (
      day1.getFullYear() === day2.getFullYear() &&
      day1.getMonth() === day2.getMonth() &&
      day1.getDate() === day2.getDate()
    );
  }

  private toDateString(date: Date): string {
    return new Date(date).toLocaleDateString('sv').split(' ')[0];
  }

  private async createAndAddTimePeriod(
    roomId: number,
    timePeriods: TimePeriodCreateDto[],
  ) {
    const allTimePeriods = await this.timePeriodRepository.getAllTimePeriod();

    const timePeriodValues: string[] = [];
    const timePeriodQuery = timePeriods
      .filter((timePeriod) => {
        return !allTimePeriods.some(
          (tp) =>
            tp.beginTime === timePeriod.beginTime &&
            tp.endTime === timePeriod.endTime,
        );
      })
      .map((timePeriod) => {
        timePeriodValues.push(timePeriod.beginTime, timePeriod.endTime);
        return '(?, ?)';
      })
      .join(', ');

    if (timePeriodValues.length > 0) {
      await this.timePeriodRepository.createManyTimePeriod(
        timePeriodQuery,
        timePeriodValues,
      );
    }

    const roomTimePeriodValues: (string | number)[] = [];
    const roomTimePeriodQuery = timePeriods
      .map((timePeriod) => {
        roomTimePeriodValues.push(
          roomId,
          timePeriod.beginTime,
          timePeriod.endTime,
        );
        return `(?, (SELECT id FROM TimePeriod WHERE beginTime = ? AND endTime = ?))`;
      })
      .join(', ');

    await this.timePeriodRepository.createManyRoomTimePeriod(
      roomTimePeriodQuery,
      roomTimePeriodValues,
    );
  }

  public async createRoom(data: RoomCreateDto) {
    const imageDefault = this.imageService.defaultImagePath('rooms');

    await this.roomRepository.createRoom({ ...data, image: imageDefault });

    const latestRoom = await this.roomRepository.getLatestRoom();

    const imagePath = this.imageService.saveImageFromBase64(
      data.image,
      'rooms',
      `${latestRoom.id}.png`,
    );

    await this.roomRepository.updateRoomImageById(latestRoom.id, {
      image: imagePath,
    });

    await this.createAndAddTimePeriod(latestRoom.id, data.timePeriods);
  }

  public async createBookingRoom(
    roomId: number,
    timePeriodId: number,
    data: BookingRoomCreateDto,
  ) {
    const today = new Date();
    const timeNow = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    const dateBooking = new Date(data.date);

    const timePeriod = await this.timePeriodRepository.getTimePeriodById(
      timePeriodId,
    );

    if (
      today.getDate() > dateBooking.getDate() ||
      (today.getDate() === dateBooking.getDate() &&
        timeNow > timePeriod.endTime)
    ) {
      throw new BadRequestException("Can't booking in past time");
    }

    await this.bookingRoomRepository.createBookingRoom(
      roomId,
      timePeriodId,
      data,
    );

    const latestBookingRoom =
      await this.bookingRoomRepository.getLatestBookingRoom();

    const values: (number | string)[] = [];
    const query = data.userIds
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      })
      .map((userId) => {
        values.push(latestBookingRoom.id, userId);
        return '(?, ?)';
      })
      .join(', ');

    await this.bookingMemberRepository.createBookingMember(query, values);
  }

  public async addTimePeriodById(roomId: number, data: TimePeriodCreateDto) {
    await this.timePeriodRepository.createTimePeriod(data);

    await this.timePeriodRepository.createRoomTimePeriod(roomId, data);
  }

  public async getAllRoom(): Promise<RoomWithTimePeriods[]> {
    const rooms = await this.roomRepository.getAllRoom();
    const roomsWithTimePeriods: RoomWithTimePeriods[] = [];

    for (const room of rooms) {
      const timePeriods =
        await this.timePeriodRepository.getAllTimePeriodByRoomId(room.id);

      roomsWithTimePeriods.push({
        ...room,
        timePeriods,
      });
    }

    return roomsWithTimePeriods;
  }

  public async getRoomById(id: number) {
    return this.roomRepository.getRoomById(id);
  }

  public async getRoomWithTimePeriodById(roomId: number, timePeriodId: number) {
    return this.roomRepository.getRoomWithTimePeriodById(roomId, timePeriodId);
  }

  public async getBookingRoomByRoomAndTimePeriodId(
    roomId: number,
    timePeriodId: number,
    date: Date,
  ) {
    return this.bookingRoomRepository.getBookingRoomByRoomAndTimePeriodId(
      roomId,
      timePeriodId,
      this.toDateString(date),
    );
  }

  public async getRoomWithTimePeriodsById(
    id: number,
  ): Promise<RoomWithTimePeriods> {
    const room = await this.roomRepository.getRoomById(id);

    const timePeriods =
      await this.timePeriodRepository.getAllTimePeriodByRoomId(id);

    const roomWithTimePeriods = {
      ...room,
      timePeriods,
    };

    return roomWithTimePeriods;
  }

  public async getOneMemberFromBookingRoomId(
    userId: string,
    bookingRoomId: number,
  ) {
    return this.bookingMemberRepository.getOneMemberByUserIdAndBookingRoomId(
      userId,
      bookingRoomId,
    );
  }

  public async getAllMemberFromBookingRoomId(bookingRoomId: number) {
    return this.bookingMemberRepository.getAllMemberByBookingRoomId(
      bookingRoomId,
    );
  }

  public async getRoomBookingByUserId(userId: string) {
    return this.roomRepository.getRoomBookingByUserId(userId);
  }

  public async updateRoomById(id: number, data: RoomUpdateDto) {
    if (Object.keys(data).length === 0)
      throw new BadRequestException('No data that want to update');

    const values = [];
    const updateQuery = Object.keys(data)
      .filter((key) => {
        return key !== 'timePeriods';
      })
      .map((key) => {
        values.push(data[key]);
        return `${key} = ?`;
      })
      .join(', ');

    await this.roomRepository.updateRoomById(updateQuery, values, id);

    if (data.timePeriods) {
      await this.timePeriodRepository.deleteAllTimePeriodFromRoomById(id);
      await this.createAndAddTimePeriod(id, data.timePeriods);
    }
  }

  public async updateRoomImageById(id: number, data: RoomUpdateImageDto) {
    const imagePath = this.imageService.saveImageFromBase64(
      data.image,
      'rooms',
      `${id}.png`,
    );

    await this.roomRepository.updateRoomImageById(id, { image: imagePath });
  }

  public async deleteRoomById(id: number) {
    await this.roomRepository.deleteRoomById(id);

    this.imageService.deleteImageFromName('rooms', `${id}.png`);
  }

  public async deleteTimePeriodFromRoomById(
    roomId: number,
    timePeriodId: number,
  ) {
    return this.roomRepository.deleteTimePeriodFromRoomById(
      roomId,
      timePeriodId,
    );
  }

  public async deleteBookingRoomById(id: number) {
    return this.bookingRoomRepository.deleteBookingRoomById(id);
  }
}
