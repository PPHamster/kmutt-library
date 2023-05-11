import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RoleCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}

export class RoleUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}
