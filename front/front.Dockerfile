FROM node:13.4-stretch
MAINTAINER yurabraiko@gmail.com

RUN mkdir /app ; mkdir /node_modules

WORKDIR /app

COPY wishlist_front/package.json wishlist_front/*yarn* /app/

RUN yarn install --non-interactive  --modules-folder=/node_modules

RUN ln -s /node_modules/ /app/node_modules

