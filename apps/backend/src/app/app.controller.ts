import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<any> {
    const tableName = 'hotel';
    return this.appService.getData(tableName);
  }
  // @Post()
  // async createHotel(@Body() hotelData: any): Promise<void> {
  //     await this.appService.addDataToHotelTable(hotelData);
  // }
}
