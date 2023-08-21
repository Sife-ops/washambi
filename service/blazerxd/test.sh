#!/bin/bash

while inotifywait -r "./" --include ".*\.go" -e moved_from,close_write; do
    echo "rerun in 3"
    sleep 1
    echo "rerun in 2"
    sleep 1
    echo "rerun in 1"
    sleep 1
    go test -v ./...
done

