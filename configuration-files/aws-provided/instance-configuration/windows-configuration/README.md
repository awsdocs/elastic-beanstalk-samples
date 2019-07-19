### adding-writepermission-iisfolder.config  
This configuration file uses powershell to add write permission to a custom IIS folder. Its allowing DefaultAppPool to write in custom IIS folder "C:\inetpub\wwwroot\uploads"
You can change the path as per your use-case or to the path your application is going to write.

### aws-inspector-install.config             
This configuration file to installs Amazon Inspector Agents on the windows instance launched under Elastic Beanstalk.
Please find more information here: https://docs.aws.amazon.com/inspector/latest/userguide/inspector_installing-uninstalling-agents.html

### change-iislog-location.config  
This configuration file uses appcmd.exe to set new IIS log file directory to a custom folder path. You should change the directory path 'X:\\folder\\' to your desired path before applying this configuration.

### elastic-ip-instance.config
This configuration file can be used to assign EIP on the instance launched under Elastic Beanstalk
Replace "MYEIPS" values with the list of your EIP Allocation IDs. The solution was tested on solution stack (64bit Windows Server 2016 v1.2.0 running IIS 10.0) and AMI (ami-xxxxxxxx).

### install-newrelic-agent.config
This configuration file install the infrastructure agent on the instance launched under Elastic Beanstalk. Please find the latest information/config files under new relic public documentation: https://docs.newrelic.com/docs/infrastructure/new-relic-infrastructure/installation/install-infrastructure-agent-aws-elastic-beanstalk

### join-domain-ssm.config
This configuration file uses SSM association to join windows instances launched under Elastic Beanstalk to domain. With the use of IAM Policy, AWS Directory Service (Microsoft AD)
and SSM, you can join your Elastic Beanstalk IIS Windows Instances to the AWS Directory Service domain. You can look at the our documentation in order to create IAM Policy and SSM document which is not part of this configuration file: https://aws.amazon.com/blogs/security/how-to-configure-your-ec2-instances-to-automatically-join-a-microsoft-active-directory-domain/

### t2unlimited-instance.config  
This configuration file will allow T2 Unlimited with Elastic Beanstalk for Windows based Environments. Since it is not directly possible to use T2 Unlimited instances with Elastic Beanstalk as of now the provided ebextensions config file lets you use T2 instances with Surplus credits.

### timezone-windows.config  
This configuration file configures the timezone on each instance in the environment. Its using tzutil command to set timezone on the instance.
Have a look at the URL https://technet.microsoft.com/en-us/library/cc749073%28v=ws.10%29.aspx for all possible time zone values in this case its done for UTC+1.

### web-http-tracing.config
This configuration file enables WindowsFeature Web-Http-Tracing on the windows instance launched under Elastic Beanstalk and request tracing will capture traces for requests which resulted in status codes from 400 to 599; by default, the latest 50 error traces will be saved on: %systemdrive%\inetpub\logs\FailedReqLogFiles\. Request Monitor will enable the feature to  monitor currently/hanging requests.
