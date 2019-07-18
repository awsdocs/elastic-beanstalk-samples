### timeout-commands.config
Use the `Timeout` option in the `aws:elasticbeanstalk:command` to allow the instances in your environment more time to complete deployments and on-instance configuration changes.

### timeout-waitcondition.config
Modify the `Timeout` setting on the wait condition that Elastic Beanstalk creates to allow instances time to bootstrap during environment creation, including time to install libraries, deploy your application, and perform on-instance confguration. If your application takes a long time to deploy due to long running scripts in configuration files, use this setting in conjunction with command timeout (`timeout-commands.config`) to avoid timeouts during environment creation.

### updates-immutable.config
Use immutable updates for all deployments and configuration changes that require instance replacement.

### workertier-scaleonqueuesize.config
By default, worker environments scale based on network throughput. Use this configuration file to scale based on the number of jobs waiting in the environment's SQS queue instead.

### vpc-custom-loadbalanced.config
Use this configuration file to tell Elastic Beanstalk to create your instances and load balancer in a custom VPC that you created, instead of in the default VPC.

### loadbalancer-clb-workertier.config
Use this example when you want to enables an internal classic load balancer for a worker-tier environment. Update the Availability Zones details before applying this configuration file in your environment. Test this configuration file in your test environment before applying to production.

### loadbalancer-cross-zone.config
This configuration file can help in enabling Cross Zone Balancing on a Classic Load Balance. Other configuration options are listed here: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html#command-options-general-elbloadbalancer
