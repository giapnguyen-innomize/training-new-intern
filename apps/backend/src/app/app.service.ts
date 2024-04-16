import { Injectable } from '@nestjs/common';
import { dynamoDBClient } from '../awsConfig/dynamoDBClient';
import { DynamoDB } from 'aws-sdk';



@Injectable()
export class AppService {
  dynamoDBClient: any;
  // Get hotel table data
  async getData(tableName: string): Promise<any> {
    try {
      const results = await dynamoDBClient()
        .scan({
          TableName: tableName,
        })
        .promise();
      return results.Items ;
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
     const createdHotel= await dynamoDBClient().put(params).promise();
      console.log(`Create hotel data successful!`);
    } catch (error) {
      console.error('Error adding hotel data:', error);
      throw error;
    }
  }
  //update hotel item
  async updateHotelData(
    hotelId: string,
    name:string,
    attributeName: string,
    attributeValue: any
  ): Promise<any> {
    console.log({ hotelId, attributeName, attributeValue });
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: 'hotel',
      Key: {
        hotelId: hotelId,
        name: name,
      },
      UpdateExpression: 'SET #attrName = :attrValue',
      ExpressionAttributeNames: { '#attrName': attributeName },
      ExpressionAttributeValues: { ':attrValue': attributeValue },
      ReturnValues: 'ALL_NEW',
    };

    try {
      const updatedItem = await dynamoDBClient().update(params).promise();
      console.log('Hotel data updated successfully:', updatedItem);
      return updatedItem.Attributes;
    } catch (error) {
      console.error('Error updating hotel data:', error);
      throw error;
    }
  }
  //Delete attribute
  async deleteAttribute(
    hotelId: string,
    hotelName: string,
    attributeName: string
  ): Promise<any> {
    console.log(attributeName, hotelName, hotelId);
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: 'hotel',
      Key: {
        hotelId: hotelId,
        name: hotelName,
      },
      UpdateExpression: `REMOVE ${Object.values(attributeName)}`,
      ReturnValues: 'ALL_NEW',
    };

    try {
      await dynamoDBClient().update(params).promise();
      console.log(`Delete hotel attribute successful!`)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //Delete item
  async deleteHotelItem(hotelId: string, hotelName: string): Promise<any> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: 'hotel',
      Key: {
        hotelId: hotelId,
        name: hotelName,
      },
    };

    try {
      await dynamoDBClient().delete(params).promise();
      console.log(`Delete hotel item successful!`) ;
    } catch (error) {
      console.error(`Error deleting hotel item with ID ${hotelId}:`, error);
      throw error;
    }
  }
}
