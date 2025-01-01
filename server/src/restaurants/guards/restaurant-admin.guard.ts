import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantAdmin } from '../../users/entities/restaurant-admin.entity';

@Injectable()
export class RestaurantAdminGuard implements CanActivate {
  constructor(
    @InjectRepository(RestaurantAdmin)
    private restaurantAdminRepository: Repository<RestaurantAdmin>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const restaurantId = request.params.id;

    // Super admins can access all restaurants
    if (user.role === 'super_admin') {
      return true;
    }

    // // Check if user is admin for this restaurant
    // const isAdmin = await this.restaurantAdminRepository.findOne({
    //   where: {
    //     user: { id: user.id },
    //     restaurant: { id: restaurantId },
    //     isActive: true,
    //   },
    // });

    // return !!isAdmin;

    return false;
  }
}