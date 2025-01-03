import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { FilterRestaurantsDto, PriceRange } from '../dto/filter-restaurants.dto';
import { LocationService } from './location.service';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private locationService: LocationService,
  ) { }

  async findAll(filterDto: FilterRestaurantsDto) {
    const { latitude, longitude, priceRange, searchQuery, minRating, offset = 0, limit = 10 } = filterDto;

    const query = this.restaurantRepository.createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.media', 'media')
      .leftJoinAndSelect('restaurant.menuItems', 'menuItems')
      .where('restaurant.isActive = :isActive', { isActive: true });

    // Add location-based filtering if coordinates provided
    if (latitude && longitude) {
      query.addSelect(
        `(6371 * acos(cos(radians(:latitude)) * cos(radians(restaurant.latitude)) *
        cos(radians(restaurant.longitude) - radians(:longitude)) +
        sin(radians(:latitude)) * sin(radians(restaurant.latitude))))`,
        'distance'
      )
        .setParameter('latitude', latitude)
        .setParameter('longitude', longitude)
        .orderBy('distance', 'ASC');
    }

    // Price range filter
    if (priceRange) {
      const priceRanges = {
        [PriceRange.LOW]: { min: 0, max: 500 },
        [PriceRange.MEDIUM]: { min: 501, max: 1500 },
        [PriceRange.HIGH]: { min: 1501, max: 999999 },
      };
      const range = priceRanges[priceRange];
      query.andWhere('restaurant.averagePrice BETWEEN :min AND :max', range);
    }

    // // Restaurant types filter
    // if (types?.length) {
    //   query.andWhere('types.id IN (:...typeIds)', { typeIds: types });
    // }

    // Rating filter
    if (minRating) {
      query.andWhere('restaurant.averageRating >= :minRating', { minRating });
    }

    // Search by name
    if (searchQuery) {
      query.andWhere('restaurant.name LIKE :search', { search: `%${searchQuery}%` });
    }

    // Order by created date in decending order
    query.orderBy('restaurant.createdAt', 'DESC');

    // Pagination
    const skip = offset;
    query.skip(skip).take(limit);

    const [restaurants, total] = await query.getManyAndCount();

    return {
      data: restaurants,
      meta: {
        total,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: [
        'types',
        'menuItems',
        'photos',
      ],
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async create(createDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async update(id: string, updateDto: Partial<CreateRestaurantDto>): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    Object.assign(restaurant, updateDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async remove(id: string): Promise<void> {
    const restaurant = await this.findOne(id);
    await this.restaurantRepository.remove(restaurant);
  }

  async updateAverageRating(id: string): Promise<void> {
    const restaurant = await this.findOne(id);
    const result = await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .select('AVG(review.rating)', 'avgRating')
      .addSelect('COUNT(review.id)', 'totalReviews')
      .leftJoin('restaurant.reviews', 'review')
      .where('restaurant.id = :id', { id })
      .getRawOne();

    await this.restaurantRepository.update(id, {
      averageRating: result.avgRating || 0,
      totalReviews: result.totalReviews || 0,
    });
  }

  async updateAveragePrice(id: string): Promise<void> {
    const restaurant = await this.findOne(id);
    const result = await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .select('AVG(menuItem.price)', 'avgPrice')
      .leftJoin('restaurant.menuItems', 'menuItem')
      .where('restaurant.id = :id', { id })
      .getRawOne();

    // await this.restaurantRepository.update(id, {
    //   averagePrice: result.avgPrice || 0,
    // });
  }
}
