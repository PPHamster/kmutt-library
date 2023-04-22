import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class OrderUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(20)
  public userId: string;
}
