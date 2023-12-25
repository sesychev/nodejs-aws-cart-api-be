import * as cdk from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from '@aws-cdk/aws-apigatewayv2-alpha';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { CfnOutput } from 'aws-cdk-lib';
require('dotenv').config();
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CartStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartService = new NodejsFunction(this, 'CartService', {
      environment: {
        PG_URL: process.env.PG_URL!,
        PG_DB: process.env.PG_DB!,
        PG_USER: process.env.PG_USER!,
        PG_PASSWORD: process.env.PG_PASSWORD!,
        PG_PORT: process.env.PG_PORT!,
      },
      runtime: Runtime.NODEJS_18_X,
      functionName: 'integrationSQLDatabase',
      entry: '../dist/src/main.js',
      handler: 'handler',
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      bundling: {
        externalModules: [
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',
          '@nestjs/microservices',
          'class-validator',
          'class-transformer',
        ],
      },
    });

    const httpApi = new HttpApi(this, 'CartServiceApi', {
      description: 'Cart Service API',
      corsPreflight: {
        allowHeaders: ['*'],
        allowMethods: [CorsHttpMethod.ANY],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    httpApi.addRoutes({
      path: '/{proxy+}',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'cart-service-integration',
        cartService,
      ),
    });

    new CfnOutput(this, 'httpApi.url', {
      value: `${httpApi.url}`,
      description: '',
    });
  }
}