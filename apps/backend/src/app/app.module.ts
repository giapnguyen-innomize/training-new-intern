import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';
import { HotelController } from './hotel/hotel.controller';
import { HotelService } from './hotel/hotel.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import cloudinaryConfig from './cloudinary/cloudinary.config';

@Module({
  imports: [HotelModule, ConfigModule.forRoot({ load: [cloudinaryConfig] })],
  controllers: [HotelController],
  providers: [HotelService, CloudinaryService],
})
export class AppModule {}
