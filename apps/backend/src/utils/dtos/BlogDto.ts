import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  MaxLength,
} from 'class-validator';

export class BlogCreateDto {
  @IsNotEmpty()
  @IsString()
  public article: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags: string[];
}

export class BlogUpdateDto {
  @IsNotEmpty()
  @IsString()
  public article: string;
}

export class BlogAddTagDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}
