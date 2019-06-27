FROM node:8.11.1-alpine

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm i -g nodemon

ENV NODE_ENV=development
ENV PORT=4001

EXPOSE 4001

CMD [ "nodemon", "-L", "src/index.js"]
