# syntax=docker/dockerfile:1
FROM node:16.10.0-alpine
WORKDIR /app
COPY ./ ./
RUN npm install
CMD ["node", "index.js"]