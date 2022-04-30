FROM node:16.13.2 as production

RUN apt-get update

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i -g nest @nestjs/cli

RUN npm install --only=production

COPY . .

RUN npm run build

CMD ["node", "dist/main"]