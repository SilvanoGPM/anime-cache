FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json yarn.* ./

RUN yarn

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
