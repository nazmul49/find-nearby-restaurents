import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class FindNearbyDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(50)
  radius: number = 5; // Default 5km radius
}