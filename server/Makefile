all: run

packages:
	cp package.json ../server-build/package.json
	cd ../server-build && npm install

build: packages
	npx tsc

run: build
	node ../server-build/index.js

clean:
	rm -r ../server-build/ ../node_modules ../package-lock.json ../package.json

# not being used at the current moment and is hooked up to mongodb atlas
createMongo:
	docker run -d --name productivityApp-mongo -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=productivityApp-mongo -p 27017:27017 -v $(PWD)/mongo-entrypoint/:/docker-entrypoint-initdb.d/ mongo

mongo:
	docker start productivityApp-mongo
