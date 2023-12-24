FROM node:18-alpine
# create app directory, this is our container/in our image
WORKDIR /ftkm/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]
