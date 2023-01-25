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
            environment: {},
            code: lambda.DockerImageCode.fromEcr(ecrRepository, {
                tagOrDigest: env.imageTag,
            }),
        });
    }
}
