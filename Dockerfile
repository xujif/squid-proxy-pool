FROM node:7-alpine
MAINTAINER i@xujif.com

ENV SQUID_VERSION 3.5.23-r0

RUN  apk add --no-cache curl squid=$SQUID_VERSION 

COPY conf/squid.conf /etc/squid/
RUN touch /etc/squid/peers.conf

WORKDIR /app
ENV NODE_ENV production
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 3000
EXPOSE 3128
CMD ["sh","-c","squid && node index.js"]