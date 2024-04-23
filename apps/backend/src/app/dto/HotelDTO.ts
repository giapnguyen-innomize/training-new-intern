interface Hotel {
  name: string;
  hotelId: string;
  descript?: string;
  image?: { secureUrl: string; publicId: string };
}
interface ApiResponse {
  message: string;
  data: object;
}

interface Image {
  secureUrl: string;
  publicId: string;
}
