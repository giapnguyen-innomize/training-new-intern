import { Injectable } from '@nestjs/common';
import { dynamoDBClient } from '../../awsConfig/dynamoDBClient';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class HotelService {
  dynamoDBClient: any;
  // Get hotel table data
  async getData(tableName: string): Promise<any> {
    try {
      const results = await dynamoDBClient()
        .scan({
          TableName: tableName,
        })
        .promise();
      return results.Items;
    } catch (error) {
      console.error('Error retrieving data from DynamoDB:', error);
      throw error;
    }
  }
  // Create new hotel item
  async addHotelData(hotelData: any): Promise<any> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'hotel',
      Item: hotelData,
    };
    try {
      const createdHotel = await dynamoDBClient().put(params).promise();
      return hotelData;
    } catch (error) {
      console.error('Error adding hotel data:', error);
      throw error;
    }
  }
  //update hotel item
  async updateHotelItem(
    hotelId: string,
    name: string,
    dataUpdate: any
  ): Promise<any> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'hotel',
      Item: {
        hotelId: dataUpdate.hotelId,
        name: dataUpdate.name,
        ...dataUpdate,
      },
    };
    try {
      await dynamoDBClient().put(params).promise();
      return dataUpdate;
    } catch (error) {
      console.error(`Error updating hotel item with ID ${hotelId}:`, error);
      throw error;
    }
  }

  //Delete item
  async deleteHotelItem(hotelId: string, hotelName: string): Promise<any> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: 'hotel',
      Key: {
        hotelId,
        name: hotelName,
      },
    };
    console.log(params);
    try {
      await dynamoDBClient().delete(params).promise();
      return { hotelId, hotelName };
    } catch (error) {
      console.error(`Error deleting hotel item with ID ${hotelId}:`, error);
      throw error;
    }
  }
}
