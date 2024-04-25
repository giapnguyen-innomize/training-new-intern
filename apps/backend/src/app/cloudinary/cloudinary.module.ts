import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { HotelController } from '../hotel/hotel.controller';
import { ConfigModule } from '@nestjs/config';
import cloudinaryConfig from './cloudinary.config';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forFeature(() => ({ cloudinary: cloudinaryConfig() })),
  ],
  controllers: [HotelController],
  providers: [CloudinaryService],
})
export class CloudinaryModule {}
