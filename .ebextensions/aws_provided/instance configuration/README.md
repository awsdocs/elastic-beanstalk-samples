### storage-imagevolume-docker.config
Configure the volume used by the instances in your Docker environment.

### files-downloadfromS3.config
Use the `files` key to download a file from a bucket in Amazon S3 to the instances in your environment, providing the instance profile role to use for authorization. Use this mechanism to securely provide your application with secrets that you can't include in your source code, such as private keys and database passwords.
