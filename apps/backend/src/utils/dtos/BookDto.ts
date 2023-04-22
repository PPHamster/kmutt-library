import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsBase64,
  Length,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';

export class BookCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public author: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  @Length(13, 13)
  public isbn: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public publisher: string;

  @Type(() => Date)
  @IsDate()
  public publishDate: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public language: string;

  @IsNotEmpty()
  @IsBase64()
  public image: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  public location: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public categories: string[];
}

export class BookUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public author?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(13, 13)
  public isbn?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public publisher?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public publishDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public language?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  public location?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public categories?: string[];
}

export class BookUpdateImageDto {
  @IsNotEmpty()
  @IsBase64()
  public image: string;
}
