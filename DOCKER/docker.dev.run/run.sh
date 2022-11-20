#!/bin/bash

Dir=$(pwd)
Run_File_Name="./docker.dev.run/Dockerfile"

Port=3999
Package_Name="twist"
Project_Name=""
Name="$Package_Name/$Project_Name"
Version="0.0.1"
Image="$Name:$Version"

# 镜像
Image_ID=$(docker images -q $Image)
if [ ! $Image_ID ]; then
    echo "create Image $Image"
    docker build -t $Image -f $Run_File_Name .
    Image_ID=$(docker images -q Image)
fi

# 容器
Container_ID=$(docker ps -a -q -f "name=$Name")
if [ ! $Container_ID ]; then
    docker run -it -p $Port:$Port -v $Dir:/app --name=$Name $Image
    exit 0
fi

# 状态
# created（已创建）
# restarting（重启中）
# running（运行中）
# removing（迁移中）
# paused（暂停）
# exited（停止）
# dead（死亡）
Container_Status=$(docker ps -a -f "name=$Name" --format "{{.State}}")

case $Container_Status in
    created)
        echo "created but not running, please wait."
        ;;
    restarting)
        echo "restarting..., please wait."
        ;;
    running)
        docker exec -it $Container_ID /bin/bash
        ;;
    removing)
        echo "removing..., please wait."
        ;;
    paused | exited)
        docker restart $Container_ID
        docker exec -it $Container_ID /bin/bash
        ;;
    dead)
        echo "container is dead, please remove and try again!"
        ;;
    *)
        echo "unknown state $Container_Status"
esac
