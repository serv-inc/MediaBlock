.PHONY: all deploy setup dev_ff dev_popup dev_server dev_background dev_message devall pretty test zip

all: test

deploy: test zip

setup: setup_py
	npm install
	mkdir -p addon/lib
	npm run setup

setup_py:
	python3 -m venv .v
	. .v/bin/activate
	pip install pytest black marionette_driver

dev_ff:
	npm run start:firefox

dev_popup:
	npm run dev:popup

dev_server:
	cd test/manual && python3 -m http.server

dev_background:
	git ls-files | entr npx esbuild --outfile=addon/background.js --bundle src/browserify/background.js

dev_content:
	git ls-files | entr npx esbuild --outfile=addon/content/blockif.js --bundle src/blockif.js

dev_message:
	echo src/message.mjs | entr cp src/message.mjs addon

dev_test_unit:
	git ls-files | entr npm run test

dev_test_system:
	. .v/bin/activate
	git ls-files | entr py.test-3 test/marionette_test.py

devall:
	tmux attach -t goodCo || tmux new-session -n ff -d 'make dev_ff' \; \
	new-window -n pop -d 'make dev_popup' \; \
	new-window -n bg -d 'make dev_background' \; \
	new-window -n web -d 'make dev_server' \; \
	new-window -n msg -d 'make dev_message' \; \
	new-window -n tst -d 'make dev_test_unit' \; \
	new-window -n e2e -d 'make dev_test_system' \; \
	rename 'goodCo' \; attach
#	new-window -n cntnt -d 'make dev_content' \; \

pretty:
	npm run pretty

test:
	npm run test

zip:
	cd addon && zip -r ../GoodCompany.zip ./*
