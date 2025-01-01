import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { RestaurantService } from '../services/restaurant.service';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { FilterRestaurantsDto } from '../dto/filter-restaurants.dto';
import { Role } from '../../users/enums/role.enum';
import { RestaurantAdminGuard } from '../guards/restaurant-admin.guard';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async findAll(@Query() filterDto: FilterRestaurantsDto) {
    return await this.restaurantService.findAll(filterDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.restaurantService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return await this.restaurantService.create(createRestaurantDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, RestaurantAdminGuard)
  @Roles(Role.SUPER_ADMIN, Role.RESTAURANT_ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateRestaurantDto>
  ) {
    return await this.restaurantService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.restaurantService.remove(id);
    return { message: 'Restaurant deleted successfully' };
  }
}
