FROM node:alpine

COPY . /code

WORKDIR /code

EXPOSE 80
ENV DATABASE_URL sqlite://:memory:
VOLUME [ "schema", "middleware", "seed" ]

RUN rm -rf node_modules && npm install

ENTRYPOINT [ "js-core-data-app" ]
CMD [ "start" ]