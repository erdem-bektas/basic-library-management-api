# Library Management API

## Overview
This project is a Library Management API developed using Node.js, Express, and TypeScript. The API provides endpoints to manage users, books, and borrowing/returning books.

## Setup

### Step 1: Clone the Repository
```sh
git clone https://github.com/erdem-bektas/basic-library-management-api.git
cd library-management-api
````

### Step 2: Install Dependencies
- using npm ```npm install``` or
- using pnpm ```pnpm install``` or
- using yarn ```yarn install```

### Step 3: Configure the Database
Ensure you have Docker installed and running on your system. To start the PostgreSQL container, give execute permissions to the script and run it:
```sh
chmod +x db/run_postgresql_container.sh
./db/run_postgresql_container.sh
```
### Step 4: Environment Variables
Ensure you have a .env file at the root of your project with the necessary configuration. The .env file should look like this:
```sh
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_NAME=librarymanagement
PORT=3000
DB_SYNCHRONIZE=true
DB_LOGGING=false
```
Replace your_db_username, your_db_password, and your_db_name with your actual database credentials.

### Step 5: Build and Start the Application

#### Development Mode
```sh
npm run dev
```
This command uses ts-node-dev for hot-reloading during development.
#### Production Mode
1. Built the application
```sh
npm run build
```
2. Start the Application
```sh
npm run start
````

___ 
### API Endpoints
#### User Endpoints

| HTTP Method | Endpoint                          | Description                       |
|-------------|-----------------------------------|-----------------------------------|
| GET         | /users                            | List all users                    |
| GET         | /users/:userId                    | Get details of a specific user    |
| POST        | /users                            | Create a new user                 |
| POST        | /users/:userId/borrow/:bookId     | Borrow a book                     |
| POST        | /users/:userId/return/:bookId     | Return a book                     |

#### Book Endpoints

| HTTP Method | Endpoint                          | Description                       |
|-------------|-----------------------------------|-----------------------------------|
| GET         | /books                            | List all books                    |
| GET         | /books/:bookId                    | Get details of a specific book    |
| POST        | /books                            | Create a new book                 |

___ 
### Author
##### Erdem Bektas