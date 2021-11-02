#!/bin/sh

# docker build . -t golang_work:01
cmd="docker run -d --name golang_demo -v $(pwd):/go/src/app golang_work:01 tail -f /dev/null"

echo $cmd
$cmd