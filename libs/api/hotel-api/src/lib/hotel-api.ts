import axios from 'axios';
import { HotelInfo } from 'models';

const localHostUrl = 'http://localhost:3000';

export const createHotel = async (formData: HotelInfo) => {
  try {
    const response = await axios.post(`${localHostUrl}/api/hotel`, formData);
    return response.data;
  } catch (error) {
    throw 'Error in creating hotel: ' + error;
  }
};
export const getAllHotels = async () => {
  try {
    const response = await axios.get(`${localHostUrl}/api/hotel`);
    return response.data;
  } catch (error) {
    throw 'Error in getting hotels: ' + error;
  }
};

export const getHotelById = async (id: number) => {
  try {
    const response = await axios.get(`${localHostUrl}/hotels/${id}`);
    return response.data;
  } catch (error) {
    throw 'Error in getting hotel by ID: ' + error;
  }
};

export const updateHotel = async (
  id: string,
  name: string,
  dataUpdate: HotelInfo
) => {
  try {
    const response = await axios.put(
      `${localHostUrl}/api/${id}/${name}`,
      dataUpdate
    );
    return response.data;
  } catch (error) {
    throw 'Error in updating hotel: ' + error;
  }
};

export const deleteHotel = async (name: string, id: string) => {
  try {
    const response = await axios.delete(`${localHostUrl}/api/${id}/${name}`);
    return response.data;
  } catch (error) {
    throw 'Error in deleting hotel: ' + error;
  }
};

export const uploadImage = async (imgForm: FormData) => {
  try {
    const response = await axios.post(`${localHostUrl}/api/upload`, imgForm, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

export const deleteImage = async (publicId: string, dataUpdate: HotelInfo) => {
  try {
    await axios.post(`http://localhost:3000/api/delete/image`, {
      publicId,
    });
    const response = await axios.put(
      `http://localhost:3000/api/${dataUpdate.hotelId}/${dataUpdate.name}`,
      dataUpdate
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
