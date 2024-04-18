import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloudinary.cloudName'),
      api_key: this.configService.get<string>('cloudinary.apiKey'),
      api_secret: this.configService.get<string>('cloudinary.apiSecret'),
    });
  }
  async uploadImage(image: any) {
    cloudinary.uploader.upload(
        image.tempFilePath,
        { folder: "HotelImages" },
        (err, result) => {
          if (err) throw err
          return { public_id: result.public_id, url: result.url }
        }
      );
  ;
  }
}