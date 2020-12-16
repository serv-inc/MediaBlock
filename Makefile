.PHONY: all deploy setup dev_ff dev_popup dev_server dev_background dev_message devall pretty test zip

all: test

deploy: test zip

setup:
	npm install
	mkdir -p addon/lib
	npm run setup

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

dev_test:
	git ls-files | entr npm run test

devall:
	tmux attach -t goodCo || tmux new-session -n ff -d 'make dev_ff' \; \
	new-window -n pop -d 'make dev_popup' \; \
	new-window -n bg -d 'make dev_background' \; \
	new-window -n web -d 'make dev_server' \; \
	new-window -n msg -d 'make dev_message' \; \
	new-window -n tst -d 'make dev_test' \; \
	rename 'goodCo' \; attach

pretty:
	npm run pretty

test:
	npm run test

zip:
	cd addon && zip -r ../GoodCompany.zip ./*

