Use the templates in this folder to create external resources for your environment in AWS CloudFormation.

**To create resources in CloudFormation**
1. Open the [CloudFormation console](https://console.aws.amazon.com/cloudformation/home).
2. Choose **Create stack**.
3. Choose **Upload a template to Amazon S3**.
4. Choose **Upload file** and upload the template file from your local machine.
5. Choose **Next** and follow the instructions to create a stack with the resources in the template.

To save a template from a web browser, right click the link in the following list and choose **Save as**.

## [instanceprofile-web.yaml](https://raw.githubusercontent.com/awslabs/elastic-beanstalk-samples/master/cfn-templates/instanceprofile-web.yaml)
Create an instance profile for a web application.

## [instanceprofile-worker.yaml](https://raw.githubusercontent.com/awslabs/elastic-beanstalk-samples/master/cfn-templates/instanceprofile-worker.yaml)
Create an instance profile for a worker application.

## [servicerole.yaml](https://raw.githubusercontent.com/awslabs/elastic-beanstalk-samples/master/cfn-templates/servicerole.yaml)
Create a service role that lets Elastic Beanstalk monitor and update your environments.

## [vpc-privatepublic.yaml](https://raw.githubusercontent.com/awslabs/elastic-beanstalk-samples/master/cfn-templates/vpc-privatepublic.yaml)
Create a VPC with public and private subnets.

## [vpc-public.yaml](https://raw.githubusercontent.com/awslabs/elastic-beanstalk-samples/master/cfn-templates/vpc-public.yaml)
Create a VPC with public subnets.
