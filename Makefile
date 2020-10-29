.PHONY: all setup dev1 dev2 devall pretty test

all: test

setup:
	npm install
	npm run setup
	mkdir -p addon/lib
	cp bower_components/react/react.development.js addon/lib
	cp bower_components/react/react-dom.development.js addon/lib
	python3 -m venv .v

dev1old: # deactivated, as web-ext should ensure current version
	. .v/bin/activate && python meta/manifest.py

dev_ff:
	npm run start:firefox

dev_popup:
	npm run dev:popup

dev_server:
	cd test/manual && python3 -m http.server

dev_background:
	git ls-files | entr npx esbuild --outfile=addon/background.js --bundle src/browserify/background.js

dev_message:
	echo src/message.mjs | entr cp src/message.mjs addon

devall:
	tmux attach -t goodCo || tmux new-session -n ff -d 'make dev_ff' \; \
	new-window -n pop -d 'make dev_popup' \; \
	new-window -n bg -d 'make dev_background' \; \
	new-window -n srv -d 'make dev_server' \; \
	new-window -n msg -d 'make dev_message' \; \
	rename 'goodCo' \; attach

pretty:
	npm run pretty

test:
	npm run test

deploy: test zip

zip:
	cd addon && zip -r ../GoodCompany.zip ./*
