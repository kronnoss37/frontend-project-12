# Target: install dependencies
install:
	npm ci

#	Target: run eslint in all js files
lint:
	npx eslint .

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
