# Password Checker

An application to encourage the members of an organization to improve the security of passwords.

## Installation

Password checker requires [Node.js](https://nodejs.org/) v8.9+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd password-checker
$ npm install
```

## Deployment

Migrate the database to last state

```sh
$ npm run migrate:latest
```

Build the app

```sh
$ npm run build
```

Start the server

```sh
$ npm run serve
```

## License

This project is licensed under the MIT License.