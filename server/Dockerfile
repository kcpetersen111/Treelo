FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A Makefilewildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# RUN make


# If you are building your code for production
# RUN npm ci --only=production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .


# RUN ls

RUN npm install --save

RUN npx tsc

EXPOSE 8080

CMD [ "node", "index.js" ]
