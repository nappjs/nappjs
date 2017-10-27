FROM node:alpine

COPY . /code

WORKDIR /code

EXPOSE 80
ENV DATABASE_URL sqlite://:memory:
VOLUME [ "schema" ]

RUN rm -rf node_modules && yarn install

ENTRYPOINT [ "npm", "start" ]