import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class BranchCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}

export class BranchUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  public name: string;
}
