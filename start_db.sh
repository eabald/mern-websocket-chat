#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi
docker build -t mern-websocket-chat-database database/.
docker stop mern-websocket-chat-database-1
docker rm mern-websocket-chat-database-1
docker run --name mern-websocket-chat-database-1 -d -v $PWD/database/initial_data:/tmp/data -p $MONGO_PORT:27017 mern-websocket-chat-database
