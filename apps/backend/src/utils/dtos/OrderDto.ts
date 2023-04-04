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
    public id: string
    public userId: string
    public createAt: Date
}