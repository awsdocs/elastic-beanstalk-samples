```
###################################################################################################
#### Copyright 2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
####
#### Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file
#### except in compliance with the License. A copy of the License is located at
####
####     http://aws.amazon.com/apache2.0/
####
#### or in the "license" file accompanying this file. This file is distributed on an "AS IS"
#### BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#### License for the specific language governing permissions and limitations under the License.
###################################################################################################

###################################################################################################
#### The following directory structure and configuration file to be placed inside your
#### .ebextensions folder:
#### httpd/conf.d/elasticbeanstalk.conf
#### configures Apache 2.4 for Java Tomcat environments to redirect HTTP requests on port 80 to HTTPS
#### on port 443 after you have configured your environment to support HTTPS connections.
####
#### Configuring Your Elastic Beanstalk Environment's Load Balancer to Terminate HTTPS:
####  http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-elb.html
#### 
#### Terminating HTTPS on EC2 Instances Running Tomcat:
####  http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/https-singleinstance-tomcat.html
####
#### Information on the EB extension configuration directory structure for the reverse proxy:
#### Configuring the Apache Reverse Proxy:
####  http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-tomcat-proxy.html#java-tomcat-proxy-apache
###################################################################################################
```
