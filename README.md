# Product Management System
[WIP] Product management system made with React, TypeScript, and Laravel

# Prerequisites before first-time setup
- Docker

# Setting up on your local device (First-time setup)
Run the following commands in the root of the project directory:
```bash
# if using Docker Desktop on Linux, run `docker context use default` first

# install composer dependencies using laravel sail
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs

# run Docker containers in background
docker compose up -d

# check running containers
docker ps # several containers here are unused, and are only part of the default Sail installation

# open terminal inside app container
docker exec -ti product-management-system-laravel.test-1 bash

# install npm dependencies
npm install

# start development server
npm run dev

# view application
http://localhost:5173/
```
