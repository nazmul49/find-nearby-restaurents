import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { FilterRestaurantsDto, PriceRange } from '../dto/filter-restaurants.dto';
import { RestaurantType } from '../entities/restaurant-type.entity';
import { AmbienceTag } from '../entities/ambience-tag.entity';
import { LocationService } from './location.service';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantType)
    private restaurantTypeRepository: Repository<RestaurantType>,
    @InjectRepository(AmbienceTag)
    private ambienceTagRepository: Repository<AmbienceTag>,
    private locationService: LocationService,
  ) { }

  async findAll(filterDto: FilterRestaurantsDto) {
    const {
      latitude,
      longitude,
      priceRange,
      types,
      searchQuery,
      minRating,
      ambienceTags,
      page = 1,
      limit = 10
    } = filterDto;

    const query = this.restaurantRepository.createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.types', 'types')
      .leftJoinAndSelect('restaurant.ambienceTags', 'ambienceTags')
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

    // Restaurant types filter
    if (types?.length) {
      query.andWhere('types.id IN (:...typeIds)', { typeIds: types });
    }

    // Ambience tags filter
    if (ambienceTags?.length) {
      query.andWhere('ambienceTags.id IN (:...tagIds)', { tagIds: ambienceTags });
    }

    // Rating filter
    if (minRating) {
      query.andWhere('restaurant.averageRating >= :minRating', { minRating });
    }

    // Search by name
    if (searchQuery) {
      query.andWhere('restaurant.name LIKE :search', { search: `%${searchQuery}%` });
    }

    // Pagination
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const [restaurants, total] = await query.getManyAndCount();

    return {
      data: restaurants,
      meta: {
        total,
        page,
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
        'ambienceTags',
        'menuItems',
        'photos',
        'timeSlots',
        'reviews',
        'reviews.user'
      ],
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async create(createDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createDto);

    // Fetch and assign restaurant types
    restaurant.types = await this.restaurantTypeRepository.findByIds(
      createDto.restaurantTypeIds
    );

    // Fetch and assign ambience tags
    restaurant.ambienceTags = await this.ambienceTagRepository.findByIds(
      createDto.ambienceTagIds
    );

    return await this.restaurantRepository.save(restaurant);
  }

  async update(id: string, updateDto: Partial<CreateRestaurantDto>): Promise<Restaurant> {
    const restaurant = await this.findOne(id);

    if (updateDto.restaurantTypeIds) {
      restaurant.types = await this.restaurantTypeRepository.findByIds(
        updateDto.restaurantTypeIds
      );
    }

    if (updateDto.ambienceTagIds) {
      restaurant.ambienceTags = await this.ambienceTagRepository.findByIds(
        updateDto.ambienceTagIds
      );
    }

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