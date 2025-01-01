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

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsString()
  description: string;

  @IsUrl()
  @IsOptional()
  googleMapUrl?: string;

  @IsString()
  @IsOptional()
  binNumber?: string;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsString()
  contactPhone: string;

  @IsString()
  openingTime: string;

  @IsString()
  closingTime: string;

  @IsNumber()
  @Min(0)
  totalReservationSeats: number;


  @IsArray()
  @IsString({ each: true })
  restaurantTypeIds: string[];

  @IsArray()
  @IsString({ each: true })
  ambienceTagIds: string[];

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => SeoMetadataDto)
  // seoMetadata?: SeoMetadataDto;
}

