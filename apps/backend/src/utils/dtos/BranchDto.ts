import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class BranchCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;
}

export class BranchUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;
}
