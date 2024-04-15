import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';

const { ENDPOINT_URL, REGION } = process.env;

export const dynamoDBClient = (): DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({
    region: 'eu-west-1',
    endpoint: 'http://localhost:8000',
  });
};