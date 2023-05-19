FROM public.ecr.aws/docker/library/node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM mysql:latest

COPY query/init.database.sql /docker-entrypoint-initdb.d/init.database.sql

ENV MYSQL_ROOT_PASSWORD=
ENV MYSQL_DATABASE=

COPY dist/ ./dist/

EXPOSE 3000

CMD ["mysqld"]






