#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CgmHandlerLambdaStack } from './cgm-handler-lambda-stack/cgm-handler-lambda-stack';
import * as dotenv from 'dotenv';
import { CgmHandlerEcrStack } from './cgm-handler-ecr-stack/cgm-handler-ecr-stack';
import { EnvConfig } from './common/envConfig';
dotenv.config();
const app = new cdk.App();

const env: EnvConfig = {
    account: process.env['AWS_ACCOUNT_ID'] as string,
    region: process.env['AWS_DEFAULT_REGION'] as string,
    imageTag: process.env['IMAGE_TAG'] as string,
};

const cgmHandlerEcrStack = new CgmHandlerEcrStack(app, 'CgmHandlerEcrStack', {
    env,
    tags: {
        app: 'cgm-handler',
    },
});

new CgmHandlerLambdaStack(app, 'CgmHandlerInfrastructureStack', {
    ecrRepository: cgmHandlerEcrStack.cgmHandlerRepository,
    env,
    stackName: 'CgmHandlerInfrastructure',
    tags: {
        app: 'cgm-handler',
    },
});
