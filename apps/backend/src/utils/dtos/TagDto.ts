import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TagCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}

export class TagUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}
