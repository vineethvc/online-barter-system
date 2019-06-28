FROM node:8.11.1-alpine

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm i -g nodemon

ENV NODE_ENV=development
ENV PORT=5000
ENV USERS=http://users:3001/api/users
ENV PRODUCTS=http://products:4000/api/products
ENV REVIEWS=http://reviews:4001/api/reviews
ENV BARTER=http://barter:4002/api/barter

EXPOSE 5000

CMD [ "nodemon", "-L", "src/index.js"]
