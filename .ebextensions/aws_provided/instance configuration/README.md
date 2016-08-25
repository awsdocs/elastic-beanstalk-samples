### files-downloadfromS3.config
Use the `files` key to download a file from a bucket in Amazon S3 to the instances in your environment, providing the instance profile role to use for authorization. Use this mechanism to securely provide your application with secrets that you can't include in your source code, such as private keys and database passwords.

### proxy-configure-nodejs.config
Use the option_settings key to modify Node.js Platform Options ProxyServer to select which web server should be used to proxy connections to Node.js.
Supported values for ProxyServer can be either nginx, apache or none
