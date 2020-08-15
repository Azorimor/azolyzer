FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production

# Change user for security
USER node

# Bundle app source
COPY ./dist/src/ .

EXPOSE 3000
CMD [ "node", "index.js" ]