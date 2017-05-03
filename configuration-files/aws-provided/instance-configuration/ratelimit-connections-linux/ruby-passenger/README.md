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
#### These configuration files configure Nginx for Ruby Passenger environments to rate limit the
#### amount of unique inbound connections to 1 connection per second with a burst of 10.
####
#### rate-limit-connections-ruby-passenger.config is to be placed inside your .ebextensions folder,
#### passenger-standalone.json is to be placed inside the root of your application bundle:
####
####   .ebextensions/rate-limit-connections-ruby-passenger.config
####   passenger-standalone.json
####
#### Note there are different HTTP headers used by Nginx for Load Balanced and Single Instance 
#### Environments for detecting the source IP address. Load Balanced environments will use the
#### "HTTP_X_FORWARDED_FOR" header and Single Instance will use "REMOTE_ADDR". Configure this for
#### your environment on the "limit_req_zone" line below.
###################################################################################################
```
