import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoryCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}

export class CategoryUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}
