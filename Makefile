install:
	sudo npm ci

gendiff:
	bin/gendiff.js

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npm run test
