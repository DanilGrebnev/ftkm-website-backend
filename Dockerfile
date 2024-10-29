FROM node:18-alpine
# create app directory, this is our container/in our image
WORKDIR /ftkm/backend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]
