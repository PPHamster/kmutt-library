import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsEmail,
    IsPhoneNumber,
    IsBase64,
    IsOptional,
    IsInt,
    Min,
    Max,
    MinLength,
  } from 'class-validator';

export class BookingRoomDto {
    id: number
    date: Date
    timePeriodId: Date
    roomId: number
}