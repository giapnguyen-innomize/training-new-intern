import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';
import { HotelController } from './hotel/hotel.controller';
import { HotelService } from './hotel/hotel.service';

import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [HotelModule, CloudinaryModule],
  controllers: [HotelController],
  providers: [HotelService, CloudinaryService],
})
export class AppModule {}
