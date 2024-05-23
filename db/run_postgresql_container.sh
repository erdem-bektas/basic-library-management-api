#!/bin/bash

# Configurable variables
container_name="erdembektas_postgres"
volume_name="erdembektas_data"
db_password="mysecretpassword"
db_name="librarymanagement"
init_sql_path="$(pwd)/librarymanagement_full.sql"

# Check if the volume exists, create if not
if ! docker volume inspect $volume_name &> /dev/null; then
    echo "Creating Docker volume '$volume_name'..."
    docker volume create $volume_name
else
    echo "Docker volume '$volume_name' already exists."
fi

# Check if the container is already running
if docker ps | grep -w $container_name &> /dev/null; then
    echo "Container '$container_name' is already running. Restarting..."
    docker restart $container_name
elif docker ps -a | grep -w $container_name &> /dev/null; then
    echo "Container '$container_name' exists but stopped. Starting..."
    docker start $container_name
else
    echo "Creating and starting new container '$container_name'..."
    docker run --name "$container_name" -e POSTGRES_PASSWORD="$db_password" -e POSTGRES_DB="$db_name" -d -p 5432:5432 -v "$volume_name":/var/lib/postgresql/data -v "$init_sql_path":/docker-entrypoint-initdb.d/init.sql postgres
fi

echo "PostgreSQL is ready to use!"
