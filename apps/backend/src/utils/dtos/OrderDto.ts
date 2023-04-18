import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class OrderCreateDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  public bookIds: number[];
}
export class OrderUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(20)
  public userId: string;
}

export class OrderUpdateItemDto {
  @IsOptional()
  @IsDateString()
  public latestNotify?: Date;

  @IsOptional()
  @IsDateString()
  public receivedDate?: Date;

  @IsOptional()
  @IsDateString()
  public returnedDate?: Date;
}
