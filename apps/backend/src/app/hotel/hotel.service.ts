import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';
import config from 'aws-sdk/lib/maintenance_mode_message';;
config.suppress = true;
@Injectable()
export class HotelService {
  dynamoDBClient = (): DocumentClient => {
    return new AWS.DynamoDB.DocumentClient({
      region: process.env.AWS_DEFAULT_REGION,
      endpoint: process.env.ENDPOINT_URL,
    });
  };
  // Get hotel table data
  async getData(tableName: string): Promise<any> {
    try {
      const results = await this.dynamoDBClient()
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
      const createdHotel = await this.dynamoDBClient().put(params).promise();
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
      await this.dynamoDBClient().put(params).promise();
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
    try {
      await this.dynamoDBClient().delete(params).promise();
      return { hotelId, hotelName };
    } catch (error) {
      console.error(`Error deleting hotel item with ID ${hotelId}:`, error);
      throw error;
    }
  }
}
