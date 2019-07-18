### websockets
Configure the proxy server that runs in front of your application to allow websockets.
If you're using a Classic Load Balancer, you need to enable TCP listeners. See:
http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.elb.html

### add-ebs-volume.config
This configuration file add a new volume to the instance, create filesystem and mount it.

### add-secondary-network-interface.config
This configuration file adds a secondary NetworkInterface to the EC2 instance. The SubnetId for the secondary interface has to be in the same Availability Zone as the instance.

### amazon-inspector-install.config
This configuration file installs Amazon Inspector Agents on the instance launched under Elastic Beanstalk.

### apache-mpm_prefork.config
This configuration file increases the number of MPM Prefork daemons. Its Useful on larger instance types that run out of these daemons well before memory or CPU exhaustion.

### awslogs-change-frequency.config
This configuration file modifies logrotate frequency to 5 minutes and upload to S3.

### change-nginx-max-body-size.config
This configuration file client_max_body_size in nginx within a Java environment by adding a hook.

### cron-leaderonly-linux.config
Run a cron job on only one Linux instance in the environment.

### cron-linux.config
This configuration file shows an example of running a cron job on all linux instances in the environment.

### env-regionname.config
Configure Elastic Beanstalk to pass your environment's region to your application with an environment variable.

### files-downloadfromS3.config
Use the `files` key to download a file from a bucket in Amazon S3 to the instances in your environment, providing the instance profile role to use for authorization. Use this mechanism to securely provide your application with secrets that you can't include in your source code, such as private keys and database passwords.

### install-newrelic-agent.config
This configuration file install the infrastructure agent on the instance launched under Elastic Beanstalk. Please find the latest information/config files under new relic public documentation: https://docs.newrelic.com/docs/infrastructure/new-relic-infrastructure/installation/install-infrastructure-agent-aws-elastic-beanstalk

### install-nodejs.config
This configuration file installs nodejs to a non-NodeJs solution stack.

### java-increase-file-descriptors.config
Increase file descriptors for Java Tomcat environment.

### logs-streamtocloudwatch-linux.config
Configure Cloudwatch log agent to stream logs to Cloudwatch

### logs-uploadonterminate-linux.config
Publish logs to S3 on termination of a linux instance.

### network-mtu-jumboframe.config
This configuration file Changes MTU for Jumbo-Frame enabled instances e.g->C3.large

### nodejs-increase-file-descriptors.config
Increase available file descriptors to Node.js.

### package-oracle-jdk.config
Install Oracle JDK and set as default

### proxy-configure-nodejs.configs
Use the option_settings key to modify Node.js Platform Options ProxyServer to select which web server should be used to proxy connections to Node.js.
Supported values for ProxyServer can be either nginx, apache or none

### storage-efs-createfilesystem.config
Use the `Resources` key to create a new file system in Amazon Elastic File System (Amazon EFS). All of the instances in your environment can connect to the same EFS file system for shared, scalable storage. Use `storage-efs-mountfilesystem.config` to mount the file system on each instance. Note that any resources that you create with configuration files are tied to the lifecycle of your environment and will be lost if you terminate your environment or remove the configuration file.

### storage-efs-mountfilesystem.config
Mount an Amazon EFS file system to a local path on the instances in your environment. You can create the volume as part of the environment with `storage-efs-createfilesystem.config`, or external to your environment by using the Amazon EFS Management Console, AWS CLI, or an SDK.

### storage-imagevolume-docker.config
Configure the volume used by the instances in your Docker environment.

### t2unlimited-instance.config
This configuration file will allow T2 Unlimited with Elastic Beanstalk for Linux based Environments. Since it is not directly possible to use T2 Unlimited instances with Elastic Beanstalk as of now, the below provided ebextensions config file lets you use T2 instances with Surplus credits.
Note: Since the container_command "set-t2-unlimited" makes an api call "modify-instance-credit-specification", the instance profile associated with the Beanstalk environment's instance must have necessary
permissions to make the api call (ec2:ModifyInstanceCreditSpecification).

### timezone-linux.config
Configure the timezone on each instance.
