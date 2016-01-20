Deploying a Symfony2 Application to AWS Elastic Beanstalk
=========================================================

This tutorial walks you through deploying a sample application from Linux/UNIX to AWS Elastic Beanstalk using eb (an updated command line interface) and Git, and then updating the application to use the [Symfony2] (http://symfony.com/) framework.

Step 1: Install the Elastic Beanstalk Command Line Interface (CLI) and Set Up Your Git Repository
------------------------------------------------------------------------
The [Elastic Beanstalk command line interface](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) (EB CLI) is a command line interface that helps you deploy applications quickly and easily using Git. 

**To install eb, its prerequisite software, and initialize your Git repository**

 1. Install EB Command Line Interface (CLI) 3.x by using Pip. 
> For information on how to install the EB CLI 3.x see, [Getting Set Up with EB Command Line Interface (CLI) 3.x](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html).
  
 2. Go to http://git-scm.com/, and download and install Git. 
> We recommend using Git 1.6.6 or later.

Step 2: Set Up Your Symfony2 Development Environment
----------------------------------------------------
The following procedure walks you through setting up Symfony2 on a Linux operating system. For more information, go to http://symfony.com/download.

**To set up your PHP development environment on your local computer**

1 .  Download and install composer from http://getcomposer.org/download/.

    curl -sS https://getcomposer.org/installer | php

> **Note**   If the installation reports problems when you try to install composer, run the command `sudo apt-get update` and then reinstall curl by running the command `sudo apt-get install php5-cli`. Repeat step 1.

2 .   Install Symfony2 Standard Edition with Composer. Check http://symfony.com/download for the latest available version. Using the following command, composer will install the vendor libraries for you, including the example.

    php composer.phar create-project symfony/framework-standard-edition symfony2_example/ path/ "2.3.*"

> **Note** You may need to set the date.timezone in the php.ini to successfully complete installation.

> When prompted to install the Acme demo bundle, enter y. When prompted, accept the default values for the following parameters.
    database_driver (pdo_mysql): 
    database_host (127.0.0.1): 
    database_port (null): 
    database_name (symfony): 
    database_user (root): 
    database_password (null): 
    mailer_transport (smtp): 
    mailer_host (127.0.0.1):     
    mailer_user (null): 
    mailer_password (null): 
    locale (en): 
    secret (ThisTokenIsNotSoSecretChangeIt):

3 . Change directory to **symfony2_example/&lt;version number&gt;** and initialize the Git repository.

    git init 

4 .  Update the .gitignore file to ignore vendor, cache, logs, and composer.phar. 
	These files do not need to get pushed to the remote server.

    cat > .gitignore <<EOT
    app/bootstrap.php.cache
    app/cache/*
    app/logs/*
    vendor
    composer.phar


5 .  Generate the hello bundle. 

    php app/console generate:bundle --namespace=Acme/HelloBundle --format=yml

> When prompted, accept all defaults. For more information, go to [Creating Pages in Symfony2](http://symfony.com/doc/current/book/page_creation.html).

Step 3: Configure Composer
--------------------------
Next, you need to configure Composer. Composer dependencies require that you set the HOME or COMPOSER_HOME environment variables. You can also configure Composer to self-update so that you always use the latest version.

**To Configure Composer**

1 .  Create a configuration file with the extension .config (e.g., composer.config) and place it in an .ebextensions directory at the top level of your source bundle 
`(symfony2_example/<version number>/src/AppBundle).` 

> You can have multiple configuration files in your .ebextensions
> directory. For information about the file format of configuration
> files, see [Advanced Environment Customization with Configuration Files (.ebextensions)](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html).
> 
> **Note** &nbsp; Configuration files should conform to YAML or JSON formatting standards. For more information, go to http://www.yaml.org/start.html
> or http://www.json.org, respectively.

 2 .  In the .config file, type the following:

    commands:
      01updateComposer:
        command: export COMPOSER_HOME=/root && /usr/bin/composer.phar self-update

    option_settings:
      - namespace: aws:elasticbeanstalk:application:environment
        option_name: COMPOSER_HOME
        value: /root

Step 3: Configure AWS Elastic Beanstalk
---------------------------------------
The following instructions use the EB CLI to configure an Elastic Beanstalk application repository in your local project directory. 

**To Configure AWS Elastic Beanstalk**

1 .  From the directory where you created your local repository, type the following command:

    eb init

2 .  Create an index.html file for EB CLI to use as your sample application.

    echo 'Hello World!' > index.html

> **Note** &nbsp; In Windows, do not include quotes in the command.

3 .  Set up your directory with EB CLI and then answer the questions to configure AWS Elastic Beanstalk.

    eb init -p php

4 .  When prompted for your AWS security credentials, type your access key ID and secret access key. To answer a question with the default value, press **Enter**.

5 .  Create the environment **dev-env** and deploy the sample application.

    eb create dev-env

> Wait for AWS Elastic Beanstalk to finish creating the environment. When it is done, your application is live in a load-balancing, autoscaling environment.

6 .  View your application.

    eb open