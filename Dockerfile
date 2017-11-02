FROM node:alpine

EXPOSE 80
ENV DATABASE_URL sqlite://:memory:
VOLUME [ "schema", "middleware", "seed" ]

COPY defaults /code
WORKDIR /code

RUN apk --update add gcc g++ make python \
    && npm install

ENTRYPOINT [ "npm" ]
CMD [ "start" ] 