import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { dynamoDBClient } from '../awsConfig/dynamoDBClient';
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<any> {
    const tableName = 'hotel';
    try {
      const results = await dynamoDBClient()
        .scan({
          TableName: tableName,
        })
        .promise();
      return results.Items;
      // if (results)
      //   return `Connected success to "${tableName}" table: ${results.Items}`;
    } catch (error) {
      console.error('Error retrieving data from DynamoDB:', error);
      throw error;
    }
  }
  // @Post()
  // async createHotel(@Body() hotelData: any): Promise<void> {
  //     await this.appService.addDataToHotelTable(hotelData);
  // }
}
