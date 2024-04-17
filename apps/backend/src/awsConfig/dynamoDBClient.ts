import * as AWS from 'aws-sdk';
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';
export const dynamoDBClient = (): DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: process.env.ENDPOINT_URL,
  });
};
