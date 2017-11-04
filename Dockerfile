FROM node:8.9.0-alpine

EXPOSE 80
ENV DATABASE_URL sqlite://:memory:

WORKDIR /code

RUN apk --update add gcc g++ make python git && yarn global add js-core-data-app

ENTRYPOINT [ "js-core-data-app" ]
CMD [ "start" ] 