#!/bin/bash

echo "Waiting for PostgreSQL to be ready..."

# Wait until the Postgres container is reachable
# while ! nc -z db 5432; do
# use my-stack_db for docker swarm deployment as docker swarm 
# prefix stack name to service and it cannot be avoided 
while ! nc -z my-stack_db 5432; do
  sleep 1
done

echo "PostgreSQL is up! Applying migrations..."

# Run database migrations
flask db upgrade

echo "Starting Flask app..."
exec python -m flask run --host=0.0.0.0
