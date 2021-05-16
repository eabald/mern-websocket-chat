#!/bin/bash
./stop.sh
./rm.sh

docker network create -d bridge mern-websocket-chat-network
docker build -t mern-websocket-chat-database database/.
docker run --name mern-websocket-chat-database-1  -v $PWD/database/initial_data:/tmp/data --network=mern-websocket-chat-network -d mern-websocket-chat-database

docker build -t mern-websocket-chat-redis redis/.
docker stop mern-websocket-chat-redis-1
docker rm mern-websocket-chat-redis-1
docker run --name mern-websocket-chat-redis-1 --network=mern-websocket-chat-network -d mern-websocket-chat-redis

docker build -t mern-websocket-chat-app .
docker run --name mern-websocket-chat-app-1 --network=mern-websocket-chat-network -d mern-websocket-chat-app
docker run --name mern-websocket-chat-app-2 --network=mern-websocket-chat-network -d mern-websocket-chat-app
docker run --name mern-websocket-chat-app-3 --network=mern-websocket-chat-network -d mern-websocket-chat-app

docker build -t mern-websocket-chat-webserver webserver/.
docker run --name mern-websocket-chat-webserver-1 --network=mern-websocket-chat-network -p 80:80 -p 443:443 -d mern-websocket-chat-webserver

docker exec -it mern-websocket-chat-database-1 bash -c "mongoimport -vvv --jsonArray --uri='mongodb://@localhost/mern-websocket-chat' --collection=users --file=/tmp/data/users.json"
docker exec -it mern-websocket-chat-database-1 bash -c "mongoimport -vvv --jsonArray --uri='mongodb://@localhost/mern-websocket-chat' --collection=rooms --file=/tmp/data/rooms.json"
