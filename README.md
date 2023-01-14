# sls-openai-api

__Purpose__

When making client applications that utilize the [OpenAI API](https://openai.com/api/), you may want to encapsulate requests via a Micro-service layer.

This creates a Micro-service for calling the OpenAI API using the following:

* Amazon Web Services
* Amazon API Gateway
* AWS Lambda
* serverless framework for Infrastructure-as-code

![techstack](./docs/overview_techstack.jpg)

__Usage__

Pre-requisites
* You have the serverless framework installed.  This is the infrasructure-as-code tool that will deploy this Micro-service.
* You have an OpenAI API key

1. Clone
2. Update .env with your OpenAI API key.
3. Deploy this micro-service to your own AWS Account

````
sls deploy
````