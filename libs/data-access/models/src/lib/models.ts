export interface Image {
  secureUrl: string;
  publicId: string;
}

export interface HotelInfo {
  name: string;
  hotelId: string;
  descript?: string;
  image?: Image;
}
