### loadbalancer-accesslogs-existingbucket.config
Configure the load balancer in your environment to upload access logs to an existing bucket that you have configured to allow ELB write access.

### loadbalancer-accesslogs-newbucket.config
Create a new bucket and configure the load balancer to write access logs to it.

### loadbalancer-idle-timeout.config
Updating the idle timeout value for the load balancer.

### backend-cloudwatch-logs.config
Configures Elastic Beanstalk backend instances to log to CloudWatch Logs using the CloudWatch agent. This is Linux only and will allow users to monitor instance logs near real-time. Every instance will have a unique log, pre-pended with the instance ID to distinguish between instance logs. The only requirement is to change the region to your used region.

### cloudwatch-memory-metrics.config
Configures Elastic Beanstalk backend instances to push memory usage metrics to CloudWatch.
