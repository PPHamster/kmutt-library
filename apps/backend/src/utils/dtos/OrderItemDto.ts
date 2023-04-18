import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class OrderItemCreateDto {
  @IsInt()
  bookId: number;
}

export class OrderItemUpdateDto {
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
