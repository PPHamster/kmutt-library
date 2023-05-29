import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsBase64,
  IsDate,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class EventCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;

  @IsNotEmpty()
  @IsString()
  public location: string;

  @Type(() => Date)
  @IsDate()
  public meetingTime: Date;

  @Type(() => Date)
  @IsDate()
  public endTime: Date;

  @IsNotEmpty()
  @IsBase64()
  public image: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  public categories: string[];
}

export class EventUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public location?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public meetingTime?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public endTime?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  public categories?: string[];
}

export class EventUpdateImageDto {
  @IsNotEmpty()
  @IsBase64()
  public image: string;
}

export class EventAddCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}
