# This is for the dockerfile and will not work outside of docker
all: runFrontend runBackend

build: docker

runFrontend:
	cd ./frontend && make

#backend
runBackend: backend
	node server-build/index.js

backend:
	cd ./server && make build

#backend with docker
backend-docker:  
	cd ./server && docker build -t productivity-app-backend .


# litterally why would you ever put a frontend in a docker container
# front end
# frontend: 
# 	cd ./frontend && make build

# frontend-docker: frontend 
# 	cd ./frontend &&  docker build -t productivity-app-frontend .
