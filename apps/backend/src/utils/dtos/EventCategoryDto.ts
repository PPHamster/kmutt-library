import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EventCategoryCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}

export class EventCategoryUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}
