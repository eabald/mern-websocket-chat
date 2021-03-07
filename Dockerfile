FROM node:14-alpine AS CLIENT

WORKDIR /usr/app
RUN chown node:node /usr/app
USER node
COPY --chown=node:node ./client .
RUN npm i
RUN npm run build

FROM node:14-alpine AS BUILDER

WORKDIR /usr/app
RUN chown node:node /usr/app
USER node
COPY --chown=node:node ./backend .
RUN npm i
RUN npm run build

FROM node:14-alpine AS SERVER

WORKDIR /usr/app
RUN chown node:node /usr/app
USER node
COPY --chown=node:node backend/package.json backend/package-lock.json /usr/app/
RUN npm i --only=prod
COPY --from=BUILDER /usr/app/build /usr/app
COPY --from=CLIENT /usr/app/build /usr/app/public
COPY .env.example.prod .env

CMD ["node_modules/.bin/pm2-runtime", "server.js"]
