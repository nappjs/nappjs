FROM node:alpine

EXPOSE 80
ENV DATABASE_URL sqlite://:memory:
VOLUME [ "schema", "middleware", "seed" ]

COPY . /code
WORKDIR /code

RUN apk --update add gcc g++ make python \
    && rm -rf node_modules \
    && npm install

ENTRYPOINT [ "js-core-data-app" ]
CMD [ "start" ] 