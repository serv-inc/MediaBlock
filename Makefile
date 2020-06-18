.PHONY: all setup dev1 dev2 devall pretty test

all: test

setup:
	yarn
	yarn setup
	mkdir -p addon/lib
	cp bower_components/react/react.development.js addon/lib
	cp bower_components/react/react-dom.development.js addon/lib
	python -m venv .v
	. .v/bin/activate && pip install GitPython

dev1:
	. .v/bin/activate && python meta/manifest.py

dev2:
	npx babel --watch src/react --out-dir addon --presets react-app/prod

dev3oneshot: test
	yarn browserify src/browserify/blockif.js -r ./src/browserify/whitelist.js  -o addon/content/blockif.js

devalltodo:
	tmux new-session -d '. .v/bin/activate && python manifest.py' \; attach

pretty:
	yarn prettier --write .eslintrc.js addon/manifest.json

test:
	yarn test
