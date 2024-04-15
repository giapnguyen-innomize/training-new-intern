import { Injectable } from '@nestjs/common';
import { dynamoDBClient } from '../awsConfig/dynamoDBClient';
@Injectable()
export class AppService {
  dynamoDBClient: any;

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
  async addDataToHotelTable(data: any): Promise<void> {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'hotel',
      Item: data,
    };

    try {
      await this.dynamoDBClient.put(params).promise();
      console.log('Data added successfully to hotel table:', data);
    } catch (error) {
      console.error('Error adding data to hotel table:', error);
      throw error;
    }
  }
}
