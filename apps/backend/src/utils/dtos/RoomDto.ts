import {
  ArrayNotEmpty,
  IsArray,
  IsBase64,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TimePeriodCreateDto } from '@/utils/dtos/TimePeriodDto';

export class RoomCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;

  @IsNotEmpty()
  @IsString()
  public location: string;

  @IsNotEmpty()
  @IsBase64()
  public image: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimePeriodCreateDto)
  public timePeriods: TimePeriodCreateDto[];
}

export class RoomUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public location?: string;
}

export class RoomUpdateImageDto {
  @IsNotEmpty()
  @IsBase64()
  public image: string;
}

export class BookingRoomCreateDto {
  @Type(() => Date)
  @IsDate()
  public date: Date;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  public userIds: string[];
}

export class BookingRoomDeleteDto {
  @Type(() => Date)
  @IsDate()
  public date: Date;
}
