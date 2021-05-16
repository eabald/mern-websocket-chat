#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi
docker build -t mern-websocket-chat-database database/.
docker stop mern-websocket-chat-database-1
docker rm mern-websocket-chat-database-1
docker run --name mern-websocket-chat-database-1 -d -v $PWD/database/initial_data:/tmp/data -p $MONGO_PORT:27017 mern-websocket-chat-database

docker build -t mern-websocket-chat-redis redis/.
docker stop mern-websocket-chat-redis-1
docker rm mern-websocket-chat-redis-1
docker run --name mern-websocket-chat-redis-1 -d -p $REDIS_PORT:6379 mern-websocket-chat-redis

docker exec -it mern-websocket-chat-database-1 bash -c "mongoimport -vvv --jsonArray --uri='mongodb://@localhost/mern-websocket-chat' --collection=users --file=/tmp/data/users.json"
docker exec -it mern-websocket-chat-database-1 bash -c "mongoimport -vvv --jsonArray --uri='mongodb://@localhost/mern-websocket-chat' --collection=rooms --file=/tmp/data/rooms.json"
