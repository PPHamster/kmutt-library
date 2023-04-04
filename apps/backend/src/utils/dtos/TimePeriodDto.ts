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

export class TimePeriodDto {
    id: number
    beginTime: Date
    endTime: Date
}