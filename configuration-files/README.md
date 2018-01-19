## Contribution instructions
You can submit new configuration files to the [community-provided](https://github.com/awslabs/elastic-beanstalk-samples/tree/master/configuration-files/community-provided) folder.

Name the configuration file in lowercase with terms that describe the category and use case separated by hyphens, ordered from general to specific. For example:
 
  `https-instancecert-dotnet.config`

Includes a category (HTTPS), use case (instance certificate), and platform (.NET). Always include the platform last if the config is platform dependent.

Platform keywords: php, python, nodejs, golang, ruby-passenger, ruby-puma, java-tomcat, java-se, docker-sc, docker-mc, docker-pc, dotnet

Include detailed usage instructions in the configuration file itself, in comments:
```
###################################################################################################
#### These are instructions for using the configuration file, which indicate the parameters
#### that need to be changed by the user, their meaning, and an overall description of how the
#### configuration file works. Include caveats that may apply depending on the user's VPC
#### configuration (default VPC, custom VPC or no VPC), and reference other files that may be used
#### in conjunction with this one. The bounding hash marks are 99 characters long.
####
#### Author: @yourusername
###################################################################################################
```
Gather all user-configurable values as close to the top of the file as possible. Use parameters and
Refs to populate values in `Resources` blocks:

(Parameter definition near the top of the file)
```
Parameters:
  timeout: 
    Type: Number                  # Typically Number, String or CommaDelimitedList
    Description: Description      # Description of the parameter
    Default: 1500                 # Include a useful default value if you can, otherwise leave blank
```
(farther down, in a Resources block)
```
  Properties:
    Timeout: { "Ref": "timeout" }
```
`Ref`s can't be used for everything. They don't work reliably with values for configuration
settings or things like the name or content of a file in a `files` block.

Use the following block to indicate the fold below which no values should be changed:
```
##############################################
#### Do not modify values below this line ####
##############################################
```

For complex use cases, you can split your configuration into multiple files. For example, configuring HTTPS end-to-end involves multiple resources - terminating HTTPS on the load balancer, security group and backend port configuration, and terminating HTTPS again at the instance. Much of this configuration is also useful alone or in other use cases, so each piece is provided in an independent config file with instructions for supported use cases in each.

If the components are not independent or re-usable, create a subfolder for the use case in the appropriate category folder (e.g. security configuration) and include all needed configs and instructions.

Create a separate pull request and branch for each use case.
