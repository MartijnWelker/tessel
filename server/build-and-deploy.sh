#!/usr/bin/env bash

docker build -t tesselserver  -f app/Dockerfile .

$(aws ecr get-login --no-include-email --region eu-west-1)

docker tag tesselserver:latest 613568775040.dkr.ecr.eu-west-1.amazonaws.com/tesselserver:latest
docker push 613568775040.dkr.ecr.eu-west-1.amazonaws.com/tesselserver:latest

aws ecs update-service --cluster util --service tesselserver --force-new-deployment