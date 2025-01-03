import { IsOptional, IsNumber, Min, Max, IsString, IsEnum, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export enum PriceRange {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class FilterRestaurantsDto {
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsOptional()
  @IsEnum(PriceRange)
  priceRange?: PriceRange;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  types?: string[];

  @IsOptional()
  @IsString()
  searchQuery?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  minRating?: number;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  offset?: number = 0;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  limit?: number = 10;
}