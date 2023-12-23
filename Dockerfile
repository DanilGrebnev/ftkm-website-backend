FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_OPTIONS="--openssl-legacy-provider"
CMD npm run start:prod
