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

export class Book {
    id: number
    title: string
    author: string
    description: string
    isbn: string
    publisher: string
    publishDate: Date
    language: string
    image: string
    location: string
}