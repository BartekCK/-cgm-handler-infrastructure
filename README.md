# cgm-handler-infrastructure
This repository contains the infrastructure as code (IAC) for the cgm-handler application using the AWS Cloud Development Kit (AWS CDK) with TypeScript. The infrastructure consists of AWS Lambda and is used to automate the deployment of the cgm-handler application.

The infrastructure includes the following components:

- AWS EventBridge to trigger the lambda function every 15 minutes
- AWS Lambda function, deployed as a container image stored in an AWS Elastic Container Registry (ECR) private repository
- AWS Elastic Container Registry (ECR) private repository to store the Docker image of the lambda function

The IaC in this repository is designed to be flexible and scalable, allowing for easy management and deployment of the infrastructure as the [cgm-handler](https://github.com/BartekCK/cgm-handler) application evolves over time.

## Note
This infrastructure is for demonstration purposes only and is not suitable for production use. Consider adding additional security measures such as private subnets for the Lambda and RDS instances and appropriate network access control measures.
