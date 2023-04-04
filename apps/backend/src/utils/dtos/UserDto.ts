import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
  IsBase64,
  IsOptional,
  IsInt,
  Min,
  Max,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public id: string;

  @IsEmail()
  @MaxLength(150)
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public password: string;

  @IsPhoneNumber()
  public tel: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public lastname: string;

  @IsOptional()
  @IsBase64()
  public image?: string;

  @IsInt()
  @Min(new Date().getFullYear() - 50)
  @Max(new Date().getFullYear())
  public registYear: number;

  @IsInt()
  @Min(1)
  public roleId: number;

  @IsInt()
  @Min(1)
  public branchId: number;
}
