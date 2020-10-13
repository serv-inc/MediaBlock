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

dev1:
	npm run start:firefox

dev2:
	npm run dev:popup

dev3: test
	npm run dev:background

dev4:
	cd test/manual && python3 -m http.server

devall:
	tmux attach -t goodCo || tmux new-session -n mnfst -d 'make dev1' \; new-window -n rct -d 'make dev2' \; new-window -n ify -d 'make dev3' \; new-window -n srv -d 'make dev4' \; rename 'goodCo' \; attach

pretty:
	npm run pretty

test:
	npm run test

deploy: test zip

zip:
	cd addon && zip -r ../GoodCompany.zip ./*
