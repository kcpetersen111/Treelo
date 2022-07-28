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
COPY package*.json ./


# RUN ls

# RUN cd ../server-build && npm install 
RUN npm install 

COPY . .

RUN npx tsc --pretty 

COPY package*.json . ../server-build/ 

RUN cd ../server-build/. && npm install

EXPOSE ${PORT}

# CMD [ "ls" ]

CMD [ "node", "../server-build/index.js" ]
