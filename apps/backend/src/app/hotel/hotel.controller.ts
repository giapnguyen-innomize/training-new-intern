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
import { createHotelSchema } from '../validate/validateCreateHotelForm';
import { HotelInfo } from 'models';

@Controller()
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  //Get all hotel table infor
  @Get('hotel')
  async getAll(): Promise<object> {
    return await this.hotelService.getData('hotel');
  }
  // Create new hotel items
  @Post('hotel')
  async createHotel(@Body() hotelData: HotelInfo): Promise<ApiResponse> {
    const { error, value } = createHotelSchema.validate(hotelData);
    if (error) {
      console.error(error);
      return {
        message: `Create Hotel failure! ${error.message}`,
        data: { type: 'error' },
      };
    }
    const created = await this.hotelService.addHotelData(hotelData);
    if (created) {
      return { message: 'create a hotel success', data: hotelData };
    } else {
      return { message: `HotelID must unique`, data: { type: 'error' } };
    }
  }
  //Update hotel
  @Put(':hotelId/:name')
  async updateHotel(
    @Param('hotelId') hotelId: string,
    @Param('name') name: string,
    @Body() dataUpdate: HotelInfo
  ): Promise<ApiResponse> {
    const { error, value } = createHotelSchema.validate(dataUpdate);
    if (error) {
      console.error(error);
      return {
        message: `Create Hotel failure! ${error.message}`,
        data: { type: 'error' },
      };
    }
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
      data: { message: deleted.message, data: deleted.data },
    };
  }
}
