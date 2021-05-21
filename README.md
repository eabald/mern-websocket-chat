# MERN-WEBSOCKET-CHAT

![Build status](https://github.com/eabald/mern-websocket-chat/actions/workflows/ci-build.yml/badge.svg)  ![Deploy on Heroku](https://github.com/eabald/mern-websocket-chat/actions/workflows/cd-heroku.yml/badge.svg)

## Development

### Perquisites

* Docker installed.
* Node and npm installed.

### Start in development mode

Copy .env.example.dev to .env, or suplement your own .env based on .env.example.dev.

Run:

```bash
 ./start_db.sh
```

Install all dependencies:

```bash
cd backend && npm i
```

and

```bash
cd client && npm i
```

In separate terminals start development servers:

```bash
cd backend && npm start
```

and

```bash
cd client && npm start
```

## Production

Make init.sh script executable:

```bash
chmod +x init.sh
```

And run it:

```bash
./init.sh
```
