all: build packages run

packages:
	cp package.json ../server-build/package.json
	cd ../server-build && npm install

build:
	npx tsc

run:
	node ../server-build/index.js

clean:
	rm -r build

createMongo:
	docker run -d --name productivityApp-mongo -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=productivityApp-mongo -p 27017:27017 -v $(PWD)/mongo-entrypoint/:/docker-entrypoint-initdb.d/ mongo

mongo:
	docker start productivityApp-mongo