import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [HotelController],
  providers: [HotelService, CloudinaryService, ConfigService],
})
export class HotelModule {}
