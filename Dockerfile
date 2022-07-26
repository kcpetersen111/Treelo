FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# RUN make


# If you are building your code for production
# RUN npm ci --only=production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .


# RUN ls

# RUN make

EXPOSE 8080

CMD [ "make", "run" ]
