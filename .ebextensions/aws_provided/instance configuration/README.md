### files-downloadfromS3.config
Use the `files` key to download a file from a bucket in Amazon S3 to the instances in your environment, providing the instance profile role to use for authorization. Use this mechanism to securely provide your application with secrets that you can't include in your source code, such as private keys and database passwords.

### storage-efs-createfilesystem.config
Use the `Resources` key to create a new file system in Amazon Elastic File System (Amazon EFS). All of the instances in your environment can connect to the same EFS file system for shared, scalable storage. Use `storage-efs-mountfilesystem.config` to mount the file system on each instance. Note that any resources that you create with configuration files are tied to the lifecycle of your environment and will be lost if you terminate your environment or remove the configuration file.

### storage-efs-mountfilesystem.config
Mount an Amazon EFS file system to a local path on the instances in your environment. You can create the volume as part of the environment with `storage-efs-createfilesystem.config`, or external to your environment by using the Amazon EFS Management Console, AWS CLI, or an SDK.

### cloudwatch-logs.config
Install and configure the AWS CloudWatch Logs agent. By default it will let your send the following logs, streamed to CloudWatch Logs, prependend with the instance name, for central management:
 - /var/log/messages
 - /var/log/eb-activity.log
 - /var/log/eb-cfn-init.log
 - /var/log/eb-commandprocessor.log
 - /var/log/eb-publish-logs.log
 - /var/log/eb-tools.log
