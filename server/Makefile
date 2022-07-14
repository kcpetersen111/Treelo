all: build run

build:
	npx tsc

run:
	node ../server-build/index.js

clean:
<<<<<<< HEAD
	rm -r ../server-build/ ./node_modules ./package-lock.json
=======
	rm -r build

createMongo:
	docker run -d --name productivityApp-mongo -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=productivityApp-mongo -p 27017:27017 -v $(PWD)/mongo-entrypoint/:/docker-entrypoint-initdb.d/ mongo

mongo:
	docker start productivityApp-mongo
>>>>>>> origin
