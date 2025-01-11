# Tutorial: Building a Microservice Architecture with PHP Lumen

This tutorial guides you through creating a simple microservices architecture using PHP Lumen. The architecture includes multiple microservices and a separate service for the UI.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- PHP >= 7.3
- Composer
- MySQL or any database of your choice
- Docker (optional, for containerization)

## Folder Structure

Below is the recommended folder structure for a microservices architecture:

```
project-root/
├── services/
│   ├── user-service/
│   │   ├── app/
│   │   ├── bootstrap/
│   │   ├── config/
│   │   ├── database/
│   │   ├── public/
│   │   ├── resources/
│   │   ├── routes/
│   │   ├── storage/
│   │   └── tests/
│   ├── order-service/
│   │   ├── app/
│   │   ├── bootstrap/
│   │   ├── config/
│   │   ├── database/
│   │   ├── public/
│   │   ├── resources/
│   │   ├── routes/
│   │   ├── storage/
│   │   └── tests/
│   └── payment-service/
│       ├── app/
│       ├── bootstrap/
│       ├── config/
│       ├── database/
│       ├── public/
│       ├── resources/
│       ├── routes/
│       ├── storage/
│       └── tests/
├── ui-service/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── webpack.config.js
├── angular-app/
│   ├── src/
│   ├── dist/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── docker-compose.yml
```

### Folder Details

- `services/`: Contains all the backend microservices.
  - Each microservice (e.g., `user-service`, `order-service`, `payment-service`) is a standalone Lumen application.
- `ui-service/`: Contains the frontend code, which can be built using a framework like React or Vue.js.
- `docker-compose.yml`: Defines the Docker configuration for the entire architecture.

---

## Step 1: Set Up a Lumen Microservice

### 1.1 Create a New Lumen Project

Navigate to the `services` folder and create a new Lumen project for the `user-service`:

```bash
cd services
composer create-project --prefer-dist laravel/lumen user-service
```

Repeat the same for `order-service` and `payment-service`.

### 1.2 Define Routes

Edit the `routes/web.php` file in `user-service` to define an API endpoint:

```php
$router->get('/users', function () {
    return response()->json(['users' => ['Alice', 'Bob', 'Charlie']]);
});
```

Similarly, define routes in `order-service` and `payment-service`.

### 1.3 Set Up Configuration

Update the `.env` file in each service with appropriate database and application settings.

---

## Step 2: Set Up the UI Service

Navigate to the `ui-service` folder and initialize a new frontend project:

```bash
cd ui-service
npm init -y
npm install react react-dom webpack webpack-cli --save-dev
```

### 2.1 Create an Entry Point

Create a `src/index.js` file:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1>Welcome to the Microservices UI</h1>;

ReactDOM.render(<App />, document.getElementById('root'));
```

### 2.2 Configure Webpack

Create a `webpack.config.js` file:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
  },
};
```

---

## Step 3: Dockerize the Architecture

### 3.1 Write a Dockerfile for Each Service

Create a `Dockerfile` in each microservice folder (e.g., `user-service`):

```dockerfile
FROM php:7.4-cli

WORKDIR /var/www/html

COPY . .

RUN composer install

CMD [ "php", "-S", "0.0.0.0:8000", "-t", "public" ]
```

### 3.2 Write a Docker Compose File

At the root of the project, create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  user-service:
    build:
      context: ./services/user-service
    ports:
      - "8001:8000"
  order-service:
    build:
      context: ./services/order-service
    ports:
      - "8002:8000"
  payment-service:
    build:
      context: ./services/payment-service
    ports:
      - "8003:8000"
  ui-service:
    build:
      context: ./ui-service
    ports:
      - "3000:3000"
```

---

## Step 4: Run the Services

Start all the services using Docker Compose:

```bash
docker-compose up --build
```

Access the services in your browser:

- User Service: [http://localhost:8001](http://localhost:8001)
- Order Service: [http://localhost:8002](http://localhost:8002)
- Payment Service: [http://localhost:8003](http://localhost:8003)
- UI Service: [http://localhost:3000](http://localhost:3000)

---

## Conclusion

You've successfully set up a microservices architecture with PHP Lumen and a React-based UI service. This architecture is modular, scalable, and easy to maintain.
