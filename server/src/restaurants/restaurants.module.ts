import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { LocationService } from './services/location.service';
import { AmbienceTag, MenuItem, Restaurant, RestaurantType, Review } from './entities';
import { RestaurantAdmin } from 'src/users/entities/restaurant-admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, RestaurantType, MenuItem, RestaurantAdmin, Review, AmbienceTag]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, LocationService],
})
export class RestaurantsModule { }