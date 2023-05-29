import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class TimePeriodCreateDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: "Time format is 'hh:mm:ss'",
  })
  public beginTime: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: "Time format is 'hh:mm:ss'",
  })
  public endTime: string;
}

export class TimePeriodUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: "Time format is 'hh:mm:ss'",
  })
  public beginTime?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: "Time format is 'hh:mm:ss'",
  })
  public endTime?: string;
}
