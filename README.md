# Training

This project provides information and is a place to store the results of the training process for new interns

# DAY 3

We will manage a list of hotels, create APIs and store data into DynamoDB and display them on the frontend

Data for each hotel will include:

- Hotel id
- Name

## Setup DynamoDB

- Run DynamoDB local as Docker image
  - install docker
  - create new file `docker-compose.yml` under apps/backend
  - run `docker-compose up`
- Create new file `table-script.json`

## Connect NestJS application with DynamoDB

- setup `aws configure`
- create list APIs to Read, Create, Update, Delete hotel

## Frontend implement the API and show list hotel
