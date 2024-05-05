install:
	sudo npm ci

gendiff:
	bin/gendiff.js

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .	