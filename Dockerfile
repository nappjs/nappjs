FROM node:alpine

COPY . /code

WORKDIR /code

EXPOSE 80
ENV DATABASE_URL sqlite://:memory:
VOLUME [ "schema", "middleware", "seeds" ]

RUN npm install -g js-core-data-app

ENTRYPOINT [ "js-core-data-app" ]
CMD [ "start" ]