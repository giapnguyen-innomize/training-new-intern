import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

interface Image {
  secureUrl:string,
  publicId:string,
}
@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloudinary.cloudName'),
      api_key: this.configService.get<string>('cloudinary.apiKey'),
      api_secret: this.configService.get<string>('cloudinary.apiSecret'),
    });
  }
  async uploadImage(
    image: any
  ): Promise<Image> {
    return new Promise<Image>(

      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: 'auto', folder: 'HotelImages' },
            (error, result) => {
              if (error) {
                reject('Error uploading image to Cloudinary: ' + error.message);
              } else {
                resolve({
                  secureUrl: result.secure_url,
                  publicId: result.public_id,
                });
              }
            }
          )
          .end(image.buffer);
      }
    );
  }
  async deleteImage(publicId: string): Promise<object> {
    try {
      await cloudinary.uploader.destroy(publicId, function (error, result) {
        console.log(result, error);
      });
      return { 'delete image success': `${publicId}` };

    } catch (error) {
      throw new Error('Error deleting image from Cloudinary: ' + error.message);
    }
  }
}
