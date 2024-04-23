import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Controller()
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  //Get all hotel table infor
  @Get('hotel')
  async getAll(): Promise<ApiResponse> {
    const tableName = 'hotel';
    const response= await this.hotelService.getData(tableName);
    return {message:'get hotel data success!', data:{response}}
  }
  // Create new hotel items
  @Post('hotel')
  async createHotel(@Body() hotelData: Hotel): Promise<ApiResponse> {
    const created = await this.hotelService.addHotelData(hotelData);
    return { message: 'Hotel item created successfully', data: created }; //, data: created
  }
  //Update hotel
  @Put(':hotelId/:name')
  async updateHotel(
    @Param('hotelId') hotelId: string,
    @Param('name') name: string,
    @Body() dataUpdate: Hotel
  ): Promise<ApiResponse> {
    const updated = await this.hotelService.updateHotelItem(
      hotelId,
      name,
      dataUpdate
    );
    return { message: 'Hotel item update successfully', data: updated };
  }
  //Upload Image
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image) {
    const imageUrl = await this.cloudinaryService.uploadImage(image);
    return { imageUrl };
  }
  //Delete Image
  @Post('delete/image')
  async deleteImage(@Body() publicId: string): Promise<ApiResponse> {
    try {
      await this.cloudinaryService.deleteImage(publicId);
      return { message: 'Image deleted successfully', data: { publicId } };
    } catch (error) {
      throw new Error('Error deleting image: ' + error.message);
    }
  }
  // Delete hotel item
  @Delete(':hotelId/:name')
  async deleteHotel(
    @Param('hotelId') hotelId: string,
    @Param('name') hotelName: string
  ): Promise<ApiResponse> {
    const deleted = await this.hotelService.deleteHotelItem(hotelId, hotelName);
    return {
      message: `Hotel  item delete successfully`,
      data: { message:deleted.message , data:deleted.data  },
    };
  }
}
