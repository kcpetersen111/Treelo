all: frontend backend

frontend:
	cd ./frontend && make build

backend:
	cd ./backend && make
