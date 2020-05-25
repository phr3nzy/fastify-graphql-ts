# Fastify GraphQL TypeScript Backend

An implementation to the GraphQL spec using `apollo-server-fastify` (with subscriptions support) with TypeScript. DB is PostgreSQL over Knex and Objection.js. Uses a Redis cache using `ioredis` (also used for subscriptions). Argon2 and JWT are mainly used for Authentication and Authorization.

## Getting Started

### Prerequisites

- Argon2 build tools (gcc & node-gyp)

### Installation

```bash
$ yarn install
# install dependencies
```

### Environment variables

Check the `.env.template` file

### Development

```bash
$ yarn dev
# start a development server at port 3000
```

### Production

```bash
$ yarn build
# build the .ts files

$ yarn start
# start the built files
```

## Contributing

## License

MIT
