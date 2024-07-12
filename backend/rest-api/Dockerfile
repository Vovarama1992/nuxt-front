FROM node:current-alpine3.19

COPY . /app
WORKDIR /app

RUN npm ci

CMD ["npm", "run", "start:prod"]