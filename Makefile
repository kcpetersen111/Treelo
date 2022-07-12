all: build run

build:
	npx tsc

run:
	node build/index.js

clean:
	rm -r build