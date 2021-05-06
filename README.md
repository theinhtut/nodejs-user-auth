# NodeJS User Auth

NodeJS user auth app with sessions and JWT based authentication using Express, PassportJS and MongoDB.

## 🚀 Quick start

- **Install the dependencies**

  Use NodeJS `v12.16.2` and install all the dependencies

  ```shell
  # (Optional) If you are using nvm, use
  nvm use 12.16.2

  # Install dependencies
  npm i
  ```

- **Add environment variables in `dev.js`**

  Create the development environment variables file `.env.development` as following in `.env.example`:

  ```
  NODE_ENV=
  MONGO_URI=
  SESSIONS_SECRET=
  JWT_SECRET_KEY=
  ...
  ```

- **Run the development server**

  You can start your development server either in session or JWT based authentication as following:

  ```shell
  # For session-based authentication
  npm run dev:session

  # For JWT-based authentication
  npm run dev:jwt
  ```

- **Browse**

  By default, the server will run on `localhost:3000`

## 🏃‍♂️ Running Scripts

Running different scripts by using `npm run <script>`

| `npm run <script>` | Description                                  |
| ------------------ | -------------------------------------------- |
| `start:session`    | Run session-based authentication prod server |
| `start:jwt`        | Run JWT-based authentication prod server     |
| `dev:session`      | Run session-based authentication dev server  |
| `dev:jwt`          | Run JWT-based authentication dev server      |
| `lint`             | Lint all files                               |

## 🧐 What's inside?

A top-level view of files and directories of the application's folder structure.

    .
    ├── .vscode
    ├── .gitignore
    ├── .prettierrc
    ├── .prettierignore
    ├── .eslintignore
    ├── .eslintrc.json
    ├── .nvmrc
    ├── config
    ├── helpers
    ├── middlewares
    ├── models
    ├── routes
    ├── services
    ├── app-jwt.js
    ├── app.js
    ├── package-lock.json
    ├── package.json
    └── README.md

## 🐳 Using with Docker

#### Running the containers

```shell
# For development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# For production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

#### Stopping the containers

```shell
# For development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

# For production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
```

#### Environment variables

Environment variables for `MONGO_URI` will be slightly differnt for running the web-app with and without using docker.

It is recommended to use MongoDB IP address as `mongo` inside the docker container.

_Using docker_

```
MONGO_URI=mongodb://mongo:27017/your-db-name
...
```

_Without docker_

```
MONGO_URI=mongodb://X.X.X.X:27017/your-db-name
...
```
