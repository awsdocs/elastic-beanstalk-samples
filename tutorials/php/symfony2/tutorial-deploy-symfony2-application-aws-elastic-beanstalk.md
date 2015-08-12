Deploying a Symfony2 Application to AWS Elastic Beanstalk
=========================================================

This tutorial walks you through deploying a sample application from Linux/UNIX to AWS Elastic Beanstalk using eb (an updated command line interface) and Git, and then updating the application to use the Symfony2 framework.

Step 1: Install the Elastic Beanstalk Command Line Interface (CLI) and Set Up Your Git Repository
------------------------------------------------------------------------
Eb is a command line interface that helps you deploy applications quickly and easily using Git. 

**To install eb, its prerequisite software, and initialize your Git repository**

 1. Install EB Command Line Interface (CLI) 3.x by using Pip. 
> For information on how to install the EB CLI 3.x see, [Getting Set Up with EB Command Line Interface (CLI) 3.x](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html).
  
 2. Go to http://git-scm.com/, and download and install Git. 
> We recommend using Git 1.6.6 or later.

Step 2: Set Up Your Symfony2 Development Environment
----------------------------------------------------
The following procedure walks you through setting up Symfony2 on a Linux operating system. For more information, go to http://symfony.com/download.

**To set up your PHP development environment on your local computer**

 1. Download and install composer from http://getcomposer.org/download/.

    curl -sS https://getcomposer.org/installer | php

> **Note**   If the installation reports problems when you try to install composer, run the command `sudo apt-get update` and then reinstall curl by running the command `sudo apt-get install php5-cli`. Repeat step 1.

 2. Install Symfony2 Standard Edition with Composer. Check http://symfony.com/download for the latest available version. Using the following command, composer will install the vendor libraries for you, including the example.

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

 1. Change directory to symfony2_example/ <version number> and initialize the Git repository.

    git init 

 2. Update the .gitignore file to ignore vendor, cache, logs, and composer.phar. These files do not need to get pushed to the remote server.