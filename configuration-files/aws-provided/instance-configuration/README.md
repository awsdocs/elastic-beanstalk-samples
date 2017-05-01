### cloudwatch-log-stream.config
Configure Cloudwatch log agent to stream logs to Cloudwatch

### env-regionname.config
Configure Elastic Beanstalk to pass your environment's region to your application with an environment variable.

### files-downloadfromS3.config
Use the `files` key to download a file from a bucket in Amazon S3 to the instances in your environment, providing the instance profile role to use for authorization. Use this mechanism to securely provide your application with secrets that you can't include in your source code, such as private keys and database passwords.

### ratelimit-connections-linux
Configure Apache or Nginx to rate limit the amount of unique inbound connections per instance in that environment.

### storage-efs-createfilesystem.config
Use the `Resources` key to create a new file system in Amazon Elastic File System (Amazon EFS). All of the instances in your environment can connect to the same EFS file system for shared, scalable storage. Use `storage-efs-mountfilesystem.config` to mount the file system on each instance. Note that any resources that you create with configuration files are tied to the lifecycle of your environment and will be lost if you terminate your environment or remove the configuration file.

### storage-efs-mountfilesystem.config
Mount an Amazon EFS file system to a local path on the instances in your environment. You can create the volume as part of the environment with `storage-efs-createfilesystem.config`, or external to your environment by using the Amazon EFS Management Console, AWS CLI, or an SDK.

### storage-imagevolume-docker.config
Configure the volume used by the instances in your Docker environment.

### package-oracle-jdk.config
Install Oracle JDK and set as default

### proxy-configure-nodejs.configs
Use the option_settings key to modify Node.js Platform Options ProxyServer to select which web server should be used to proxy connections to Node.js.
Supported values for ProxyServer can be either nginx, apache or none
