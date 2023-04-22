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

  @IsPhoneNumber('TH')
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
  @IsNotEmpty()
  @IsBase64()
  public image?: string;

  @IsInt()
  @Min(new Date().getFullYear() - 50)
  @Max(new Date().getFullYear())
  public registYear: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public role: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public branch: string;
}

export class UserUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public password?: string;

  @IsOptional()
  @IsPhoneNumber('TH')
  public tel?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public firstname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public lastname?: string;
}

export class UserUpdateByAdminDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public password?: string;

  @IsOptional()
  @IsPhoneNumber('TH')
  public tel?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public firstname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public lastname?: string;

  @IsOptional()
  @IsInt()
  @Min(new Date().getFullYear() - 50)
  @Max(new Date().getFullYear())
  public registYear?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public role?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public branch?: string;
}

export class UserLoginDto {
  @IsEmail()
  @MaxLength(150)
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public password: string;
}

export class UserUpdateImageDto {
  @IsNotEmpty()
  @IsBase64()
  public image: string;
}
