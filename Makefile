# This is for the dockerfile and will not work outside of docker
all:

build: docker

docker: frontend backend
	docker build -t productivity-app .

frontend:
	cd ./frontend && make build

backend:
	cd ./server && make build

run:
	node server-build/index.js
