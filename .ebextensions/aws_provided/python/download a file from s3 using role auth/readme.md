Either the role, file, or bucket policy must permit download. Standard S3 ACL, bucket policy, and IAM policies still apply.

Sample complementary bucket policy: 

    {
    	"Version": "2008-10-17",
    	"Statement": [
    		{
    			"Effect": "Allow",
    			"Principal": {
    				"AWS": "arn:aws:iam::accountid:role/aws-elasticbeanstalk-ec2-role"
    			},
    			"Action": "s3:GetObject",
    			"Resource": "arn:aws:s3:::MYBUCKETNAME/*"
    		}
    	]
    }


Just replace MYBUCKETNAME with your Amazon S3 bucket name.
