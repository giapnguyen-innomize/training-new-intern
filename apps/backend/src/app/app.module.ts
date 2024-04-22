import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';
import { ConfigModule } from '@nestjs/config';
import cloudinaryConfig from './cloudinary/cloudinary.config';

@Module({
  imports: [HotelModule, ConfigModule.forRoot({ load: [cloudinaryConfig] })],
  controllers: [],
  providers: [],
})
export class AppModule {}
