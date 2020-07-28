FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install git (currently used for discordjs.commando, because their npm site is 2 years behind github master).
# Maybe change to multi staged build.
RUN apk add --no-cache git
# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm ci --only=production

# Change user for security
USER node

# Bundle app source
COPY ./dist/src/ .

EXPOSE 3000
CMD [ "node", "index.js" ]