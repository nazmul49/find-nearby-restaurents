import { IsString, IsNumber, IsOptional, Min, Max, IsUrl, IsArray, ValidateNested, IsEnum } from 'class-validator';

class SeoMetadataDto {
  @IsString()
  metaTitle: string;

  @IsString()
  metaDescription: string;

  @IsArray()
  @IsString({ each: true })
  metaTags: string[];
}

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  branchName: string;

  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsUrl()
  @IsOptional()
  googleMapUrl?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsString()
  @IsOptional()
  openingTime?: string;

  @IsString()
  @IsOptional()
  closingTime?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  totalReservationSeats?: number;
}
