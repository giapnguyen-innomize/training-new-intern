import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';
import { HotelController } from './hotel/hotel.controller';
import { HotelService } from './hotel/hotel.service';

@Module({
  imports: [HotelModule],
  controllers: [HotelController],
  providers: [HotelService],
})
export class AppModule {}
