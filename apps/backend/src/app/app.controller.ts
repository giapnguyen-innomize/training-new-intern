import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //Get all hotel table infor
  @Get('hotel')
  async getAll(): Promise<any> {
    const tableName = 'hotel';
    return this.appService.getData(tableName);
  }
  // Create new hotel items
  @Post('hotel')
  async createHotel(@Body() hotelData: any): Promise<void> {
    await this.appService.addHotelData(hotelData);
  }
  // Update hotel attributes
  @Patch('hotel/:hotelId/:name')
  async updateHotel(
    @Param('hotelId') hotelId: string,@Param('name') name: string,
    @Body() updateData: any
  ): Promise<any> {
    const attributeName = Object.keys(updateData)[0];
    const attributeValue = updateData[attributeName];
    return this.appService.updateHotelData(
      hotelId,
      name,
      attributeName,
      attributeValue
    );
  }
  // Delete hotel attributes
  @Delete('hotel/:hotelId/:name')
  async deleteAttributeFromHotel(
    @Param('hotelId') hotelId: string,
    @Param('name') hotelName: string,
    @Body() attributeName: string
  ): Promise<void> {
    await this.appService.deleteAttribute(hotelId, hotelName, attributeName);
  }
  // Delete hotel item
  @Delete(':hotelId/:name')
  async deleteHotel(
    @Param('hotelId') hotelId: string,
    @Param('name') hotelName: string
  ): Promise<void> {
    await this.appService.deleteHotelItem(hotelId, hotelName);
  }
}
