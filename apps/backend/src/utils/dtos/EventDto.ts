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

export class EventDto {
    id: number
    name: string
    location: string
    meetingTime: Date
    image: string
    description: string
}