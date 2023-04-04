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

export class OrderItemDto {
    orderId: number
    bookId: number
    lastestNotify: Date
    receivedDate: Date
    returnedDate: Date
}