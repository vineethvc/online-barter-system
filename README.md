# gateway

> NodeJS Microservice architecture with API Gateway.

# Development

* Installing dependencies

```bash
$ cd users
$ npm install
$ cd ..

$ cd gateway
$ npm install
$ cd ..
```

* Running scripts

| Action                    | Usage          |
| ------------------------- | -------------- |
| Starting development mode | `npm start`    |
| Linting code              | `npm run lint` |

# Docker

* Building an image

```bash
$ docker-compose build
```

* Running a container

```bash
$ docker-compose up
```

* Stopping a container

```bash
$ docker-compose down
```

# Rest API

### Users Service

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | /api/users      | Retrieves a list of users |
