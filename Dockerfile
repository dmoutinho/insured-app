FROM node:11
COPY . /insured-app
WORKDIR /insured-app
CMD npm install && npm start
EXPOSE 3000