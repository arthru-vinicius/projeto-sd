# Dockerfile
FROM node:14
WORKDIR /usr/src/app
COPY front-end/package*.json ./
RUN npm install
RUN npm install -g serve
COPY front-end/ .
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "build"]