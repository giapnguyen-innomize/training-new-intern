interface Image {
  secureUrl: string;
  publicId: string;
}
interface Hotel {
  name: string;
  hotelId: string;
  descript?: string;
  image?: Image;
}
interface ApiResponse {
  message: string;
  data: object;
}
