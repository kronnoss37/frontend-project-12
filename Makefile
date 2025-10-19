# Target: install dependencies
install:
	npm ci

#	Target: run eslint in all js files
lint:
	npm run lint --prefix frontend

# Target: build project
build:
	npm run build

# Target: start server
start:
	npm run start

# Target: run app in browser without server
run:
	npm run dev

#	Target: run app in browser with server
app:
	npm run app
