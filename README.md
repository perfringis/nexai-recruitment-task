# nexai-recruitment-task

# dev-and-deliver-recruitment-task 

## Table of contents

- [Setup locally](#setup-locally)
- [Docker setup](#docker-setup)
- [Swagger documentation](#swagger-documentation)
- [Tests](#backend-tests)

## Setup locally

1. Clone repository:

```sh
git clone git@github.com:perfringis/nexai-recruitment-task.git
```

2. Go to a project and install packages.

```sh
pnpm install
```

3. Configure .env file based on .env.dev template.

```sh
DATABASE_NAME=<YOUR_DB_NAME>
DATABASE_PORT=<YOUR_PORT>
DATABASE_USERNAME=<YOUR_DB_USER>
DATABASE_PASSWORD=<YOUR_DB_PASS>
DATABASE_HOST=<YOUR_DB_HOST>
```

> NOTE! You can omit `DATABASE_HOST` or setup as `127.0.0.1`.

4. Run project in `dev` mode. List of all commands you will find in the `package.json` file.

```sh
pnpm run start:dev
```

## Docker setup

1. Clone repository:

```sh
git clone git@github.com:perfringis/nexai-recruitment-task.git
```

2. Run docker configuration:

```sh
docker compose -f docker-compose.yml --env-file backend/.env up
```

OR

```sh
./docker-up.sh
```

## Swagger documentation

Documentation is available under `localhost:3000/api`.

## Backend tests

Run backend tests by:

```sh
pnpm test
```