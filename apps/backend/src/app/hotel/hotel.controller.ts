import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
interface Hotel<T> {
  name: string;
  hotelId: string;
  descript: string;
}
interface ApiResponse<T> {
  message: string;
  data: {};
}
@Controller()
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}
  //Get all hotel table infor
  @Get('hotel')
  async getAll(): Promise<{}> {
    const tableName = 'hotel';
    return this.hotelService.getData(tableName);
  }
  // Create new hotel items
  @Post('hotel')
  async createHotel(@Body() hotelData: Hotel<{}>): Promise<ApiResponse<{}>> {
    console.log({ hotelData });
    const created = await this.hotelService.addHotelData(hotelData);
    return { message: 'Hotel item created successfully', data: created };
  }
  //Update hotel
  @Put(':hotelId/:name')
  async updateHotel(
    @Param('hotelId') hotelId: string,
    @Param('name') name: string,
    @Body() dataUpdate: any
  ): Promise<ApiResponse<any>> {
    console.log({ dataUpdate });
    const updated = await this.hotelService.updateHotelItem(
      hotelId,
      name,
      dataUpdate
    );
    return { message: 'Hotel item update successfully', data: updated };
  }
  // Delete hotel item
  @Delete(':hotelId/:name')
  async deleteHotel(
    @Param('hotelId') hotelId: string,
    @Param('name') hotelName: string
  ): Promise<ApiResponse<any>> {
    const deleted = await this.hotelService.deleteHotelItem(hotelId, hotelName);
    return {
      message: `Hotel  item delete successfully`,
      data: `id:${deleted.hotelId} name:${deleted.hotelName} `,
    };
  }
}
