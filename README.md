# Product Management System
[WIP] Product management system made with React, TypeScript, and Laravel

# Prerequisites before first-time setup
- Docker

# Setting up on your local device (First-time setup)
Run the following commands in the root of the project directory:
```bash
# if using Docker Desktop on Linux, run `docker context use default` first

# install composer dependencies using temporary docker container
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

# open terminal inside mysql container
docker exec -it product-management-system-mysql-1 mysql -u root -p

# if prompted for a password, enter password 'password' (without quotes)
# create mysql user
create user 'root'@'172.19.0.7' identified by 'password';

# grant all permissions to root user
grant all on *.* to 'root'@'172.19.0.7';
grant all privileges on *.* to 'root'@'172.19.0.7' with grant option;

# create project database
create database product_management_system character set utf8mb4 collate utf8mb4_unicode_ci;
exit;

# open terminal inside app container
docker exec -ti product-management-system-laravel.test-1 bash

# install dependencies
npm install

# set up .env variables
cp .env.example .env

# generate encryption key
php artisan key:generate

# generate key to sign JWT
php artisan jwt:secret

# precompile configs for performance
php artisan optimize

# run database migrations
php artisan migrate --seed

# start development server
npm run dev

# view application
http://localhost/
```

# Generating sample data
```bash
# open terminal inside app container
docker exec -ti product-management-system-laravel.test-1 bash

# seed mock data
php artisan db:seed --class=MockDataSeeder
```

# Authentication

This web app uses JWT tokens for authentication. Tokens are generated and signed with `jwt-auth`, then stored in encrypted HttpOnly cookies (with the Secure flag enabled) to prevent exposing JWT tokens through XSS injection.

# Security

Cookies are encrypted with Laravel's global `EncryptCookies` middleware. All routes have CSRF protection using Laravel's global `VerifyCsrfToken` middleware.