# syntax=docker/dockerfile:1
FROM node:16.10.0
WORKDIR /app
COPY ./ ./
RUN sudo apt install python
RUN npm install
CMD ["node", "index.js"]