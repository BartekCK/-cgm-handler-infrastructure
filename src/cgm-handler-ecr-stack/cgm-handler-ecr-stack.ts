import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export class CgmHandlerEcrStack extends cdk.Stack {
    private readonly _cgmHandlerRepository: ecr.IRepository;

    public get cgmHandlerRepository(): ecr.IRepository {
        return this._cgmHandlerRepository;
    }

    public constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this._cgmHandlerRepository = new ecr.Repository(this, 'cgmHandlerRepository', {
            repositoryName: 'cgm-handler-repository',
            lifecycleRules: [
                {
                    maxImageCount: 1,
                },
            ],
        });
    }
}
