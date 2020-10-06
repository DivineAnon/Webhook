 
FROM node:12.18.0-alpine

WORKDIR /usr/src/app
ADD package.json /usr/src/app
ADD package-lock.json /usr/src/app
# RUN npm install
ADD . /usr/src/app
EXPOSE 3000
CMD [ "npm","run","start" ]