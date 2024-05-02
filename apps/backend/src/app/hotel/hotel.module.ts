import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cloudinaryConfig from '../cloudinary/cloudinary.config';

@Module({
  imports: [
    ConfigModule.forFeature(() => ({ cloudinary: cloudinaryConfig() })),
  ],
  controllers: [HotelController],
  providers: [HotelService, CloudinaryService, ConfigService],
})
export class HotelModule {}
