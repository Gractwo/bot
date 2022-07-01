# syntax=docker/dockerfile:1
FROM node:16.10.0
WORKDIR /app
COPY ./ ./
RUN apt-get -y update
RUN apt-get install -y  build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
RUN npm install --build-from-source canvas
RUN npm install
CMD ["node", "index.js"]