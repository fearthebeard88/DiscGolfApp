#! /bin/bash

export PORT=8080

type nodemon > /dev/null
if [ $? -eq 0 ]
then
    echo "Starting application with nodemon"
    nodemon app.js
else
    type node > /dev/null
    if [ $? -ne 0]
    then
        echo "Node must be installed to start this application"
        exit 1
    fi
    
    echo "Starting application with node"
    node app.js
fi