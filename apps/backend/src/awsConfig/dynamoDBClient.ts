import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';
export const dynamoDBClient = (): DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: process.env.ENDPOINT_URL,
  });
};
