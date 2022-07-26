# This is for the dockerfile and will not work outside of docker
all:

build: docker



#backend
runBackend: backend
	node server-build/index.js

backend:
	cd ./server && make build

#backend with docker
backend-docker:  
	cd ./server && docker build -t productivity-app-backend .


# front end
frontend: 
	cd ./frontend && make build

frontend-docker: frontend 
	cd ./frontend && docker build -t productivity-app-frontend .
