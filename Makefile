setup:
	yarn
	yarn setup
	mkdir -p addon/lib
	cp bower_components/react/react.development.js addon/lib
	cp bower_components/react/react-dom.development.js addon/lib

dev1:
	. .v/bin/activate && python manifest.py

dev2:
	npx babel --watch src --out-dir addon --presets react-app/prod

devall:
	tmux new-session -d '. .v/bin/activate && python manifest.py' \; attach
