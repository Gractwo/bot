# syntax=docker/dockerfile:1
FROM node:16.10.0-alpine
FROM python
WORKDIR /app
COPY ./ ./
RUN npm install
CMD ["node", "index.js"]