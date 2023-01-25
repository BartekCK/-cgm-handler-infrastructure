import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { EnvConfig } from '../common/envConfig';

interface StackProps extends cdk.StackProps {
    ecrRepository: ecr.IRepository;
    env: EnvConfig;
}

export class CgmHandlerLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const { ecrRepository, env } = props;

        const myFunction = new lambda.DockerImageFunction(this, 'cgmHandlerLambda', {
            architecture: lambda.Architecture.X86_64,
            logRetention: RetentionDays.THREE_DAYS,
            environment: {
                DEXCOM_USERNAME: env.dexcomUsername,
                DEXCOM_PASSWORD: env.dexcomPassword,
                DEXCOM_APPLICATION_ID: env.dexcomApplicationId,
                DEXCOM_USER_LOCATION: env.dexcomUserLocation,
                DEFAULT_MAX_COUNT: env.defaultMaxCount,
                DATABASE_HOST: env.databaseHost,
                DATABASE_PORT: env.databasePort,
                DATABASE_USER: env.databaseUser,
                DATABASE_PASSWORD: env.databasePassword,
                DATABASE_NAME: env.databaseName,
            },
            code: lambda.DockerImageCode.fromEcr(ecrRepository, {
                tagOrDigest: env.imageTag,
            }),
        });
    }
}
