import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RoleCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;
}

export class RoleUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;
}
