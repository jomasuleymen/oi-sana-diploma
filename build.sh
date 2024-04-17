#!/bin/bash

web_path="client"
server_path="server"
pm2_file="ecosystem.config.js"

# Change directory to '' and install all dependencies and build the project
cd $web_path && npm install && npm run build
cd ../

# Return to the server directory
cd $server_path && npm install --force && npm run build

if [ -f "$pm2_file" ]; then
    pm2 reload $pm2_file
    echo "Reload pm2 server"
else
  echo "$pm2_file not found in server directory."
fi

# Change directory to 'server/client/assets' and gzip all files
cd ./client/assets && gzip -3 -k *
