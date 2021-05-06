FROM alpine:3.4

# Update
RUN apk add --update nodejs

# Install app dependencies
COPY ./deployment/dockerfiles/websockets/package.json /package.json
RUN cd /; npm install

# Bundle app source
COPY ./app /src

COPY ./deployment/dockerfiles/websockets/secrets-entrypoint.sh /copysecrets-entrypoint.sh

RUN chmod +x /copysecrets-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/copysecrets-entrypoint.sh"]
