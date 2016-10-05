### proxy-apache-nodejs.config
Sets the reverse proxy for a Node.js environment to Apache rather than the Nginx.

### timeout-commands.config
Use the `Timeout` option in the `aws:elasticbeanstalk:command` to allow the instances in your environment more time to complete deployments and on-instance configuration changes.

### timeout-waitcondition.config
Modify the `Timeout` setting on the wait condition that Elastic Beanstalk creates to allow instances time to bootstrap during environment creation, including time to install libraries, deploy your application, and perform on-instance confguration. If your application takes a long time to deploy due to long running scripts in configuration files, use this setting in conjunction with command timeout (`timeout-commands.config`) to avoid timeouts during environment creation.

### workertier-scaleonqueuesize.config
By default, worker environments scale based on network throughput. Use this configuration file to scale based on the number of jobs waiting in the environment's SQS queue instead.
