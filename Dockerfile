FROM node:alpine

EXPOSE 80
ENV DATABASE_URL sqlite://:memory:

WORKDIR /code

RUN mkdir schema middleware seed && apk --update add gcc g++ make python git && npm install -g js-core-data-app

ENTRYPOINT [ "js-core-data-app" ]
CMD [ "start" ] 