#!/usr/bin/bash
if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
 export NODE_ENV=$DEPLOYMENT_GROUP_NAME
fi

cd ~/TaxiMicroServiceNode
/home/ec2-user/.nvm/versions/node/v10.15.1/lib/node_modules/pm2/bin/pm2 start server