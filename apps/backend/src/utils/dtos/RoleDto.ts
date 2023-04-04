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

export class RoleDto {
    id: number
    name: string
    isBorrow: boolean
    isBookingWorkingSpace: boolean
    isBookingTeachingRoom: boolean
    canManage: boolean
    accessServerRoom: boolean
    accessStaffRoom: boolean
    manageBlacklist: boolean
}