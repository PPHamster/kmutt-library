import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class BlogCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public topic: string;

  @IsNotEmpty()
  @IsString()
  public article: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  public tags: string[];
}

export class BlogUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public topic?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public article?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  public tags?: string[];
}

export class BlogAddTagDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}
