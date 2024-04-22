import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { HotelController } from '../hotel/hotel.controller';

@Module({})
export class CloudinaryModule {
  controllers: [HotelController];
  providers: [CloudinaryService];
}
