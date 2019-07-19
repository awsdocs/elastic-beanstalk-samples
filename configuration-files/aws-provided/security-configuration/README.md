### https-instancecert
Install a certificate and private key stored in Amazon S3, and configure the proxy server that runs in front of your application to terminate HTTPS connections. Use this configuration to terminate HTTPS in single instance environments, environments with a load balancer configured to pass through encrypted traffic as-is, or environments with a load balancer that decrypts HTTPS, then re-encrypts between the load balancer and the instance serving the request.

For single instance environments, include `https-singleinstance-securitygroup.config` as well to allow HTTPS traffic through the instance's security group.

### https-redirect
Configure the proxy server that runs in front of your application to redirect HTTP requests on port 80 to the same path on HTTPS/443.

### proxy-ratelimit-linux
Configure Apache or Nginx to rate limit the amount of unique inbound connections per instance in that environment.

### https-singleinstance-securitygroup.config
Modify your instance's security group to allow HTTPS traffic on port 443. Use in conjunction with `https-instancecert-<platform>.config` to support HTTPS connections in a single instance environment.

### loadbalancer-alb-securelistener.config
The example uses options in the aws:elbv2:listener namespace to configure an HTTPS listener on port 443 with the specified certificate.
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-elb.html#configuring-https-elb.configurationfile

### loadbalancer-clb-securelistener.config
The example uses options in the aws:elb:listener namespace to configure an HTTPS listener on port 443 with the specified certificate.
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-elb.html#configuring-https-elb.configurationfile

### loadbalancer-nlb-securelistener.config
The example uses options in the aws:elbv2:listener namespace to configure a listener on port 443. The listener routes traffic to the default process. https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-elb.html#configuring-https-elb.configurationfile

### rds-ssl-java.config
Install SSL certificates for RDS database connections with JDBC.

### redshift-ssl-java.config
Install SSL certificates for Redshift database connections with JDBC.

### securitygroup-addexisting.config
Configure the Auto Scaling Group to launch EC2 instances with an existing Security Group. This is an additional Security Group to the one automatically created by Elastic Beanstalk for the EC2 instances. Useful when configuring a database's instance Security Group to only accept connections from a specific source Security Group of your Elastic Beanstalk environment's instances.

### securitygroup-loadbalanced-configureexisting.config
Configure the Security Groups for the ELB and the EC2 instances apart of the Auto Scaling Group. This is useful If you'd like to make changes to the default Security Groups created by Elastic Beanstalk.

### ssh-sourcerestriction.config
Use the `SSHSourceRestriction` option in the `aws:autoscaling:launchconfiguration` namespace to restrict SSH traffic to connections from instances in a security group that you control. By default, Elastic Beanstalk opens port 22 to the world when you assign a key pair to your instances. Use this configuration file to override that behavior.
