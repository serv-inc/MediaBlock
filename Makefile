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
	yarn dev:react

dev3: test
	yarn dev:watchify

dev4:
	cd test/manual && python -m http.server

devall:
	tmux new-session -n mnfst -d '. .v/bin/activate && python meta/manifest.py' \; new-window -n rct -d 'yarn dev:react' \; new-window -n ify -d 'yarn dev:watchify' \; new-window -n srv -d 'cd test/manual && python -m http.server' \; attach

pretty:
	yarn pretty

test:
	yarn test
