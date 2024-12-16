# Book Management API

A RESTful API built using the MEAN stack for managing books with authentication and authorization features.

## Features

-   User authentication using JWT
-   CRUD operations for books
-   Input validation and error handling
-   Pagination, search, sorting for books
-   Soft delete for book entries (optional)

## Setup Instructions

### Prerequisites

-   Node.js (>=20.x)
-   MongoDB (local or cloud-based)

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables: Create a .env file in the root directory and configure the following:
    ```makefile
    PORT=3000
    MONGODB_CONN=your_database_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4. Start the application:

-   For production:
    ```bash
    npm start
    ```
-   For developement:
    ```bash
    npm run dev
    ```
