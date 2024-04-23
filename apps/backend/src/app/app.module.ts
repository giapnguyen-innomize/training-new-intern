import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HotelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
