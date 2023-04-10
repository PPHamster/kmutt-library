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

export class OrderCreateDto {
    @IsOptional()
    @IsNotEmpty()
    public id?: number

    @IsNotEmpty()
    public userId: string

    @IsOptional()
    @IsNotEmpty()
    public createAt?: Date
}