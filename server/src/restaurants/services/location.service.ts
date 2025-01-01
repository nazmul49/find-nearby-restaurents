import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async findNearbyRestaurants(
    latitude: number,
    longitude: number,
    radiusInKm: number,
  ): Promise<Restaurant[]> {
    // Haversine formula in SQL to calculate distance
    const query = this.restaurantRepository
      .createQueryBuilder('restaurant')
      .select()
      .addSelect(
        `(6371 * acos(cos(radians(:latitude)) * cos(radians(restaurant.latitude)) * cos(radians(restaurant.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(restaurant.latitude))))`,
        'distance',
      )
      .where('restaurant.isActive = :isActive', { isActive: true })
      .setParameter('latitude', latitude)
      .setParameter('longitude', longitude)
      .having('distance <= :radius', { radius: radiusInKm })
      .orderBy('distance', 'ASC');

    return await query.getMany();
  }
}