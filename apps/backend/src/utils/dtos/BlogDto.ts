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
  
export class BlogDto {
    id: number
    article: string
    createdAt: Date
    updateAt: Date
    userId: string
    bookId: number
}