FROM node:8.11.1-alpine

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm i -g nodemon

ENV NODE_ENV=development
ENV PORT=5000
ENV USERS=http://users:3000/api/users

EXPOSE 5000

CMD [ "nodemon", "-L", "src/index.js"]
