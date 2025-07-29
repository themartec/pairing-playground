PROJECT := pairing-playground

default: usage

# user and repo
USER        = $$(whoami)
CURRENT_DIR = $(notdir $(shell pwd))

# terminal colors
RED     = \033[0;31m
GREEN   = \033[0;32m
YELLOW  = \033[0;33m
BLUE    = \033[0;34m
MAGENTA = \033[0;35m
BOLD    = \033[1m
RESET   = \033[0m

.PHONY: check
check:
	@echo "Checking Node.js version..."
	@node --version
	@node -e "const v = process.version.slice(1).split('.')[0]; \
		if (parseInt(v) < 22) { \
		console.error('❌ Node.js version 22+ required, found v' + process.version); \
		process.exit(1); \
		} \
		else { console.log('✅ Node.js version check passed'); }"

.PHONY: install
install:
	npm install

.PHONY: lint
lint:
	npm run lint

.PHONY: format-check
format-check:
	npm run format:check

.PHONY: test-unit
test-unit:
	npm run test:unit

.PHONY: build
build: check install lint format-check test-unit
	@echo
	@echo "✅ ${GREEN}Success${RESET} you are ready to ${BOLD}${MAGENTA}PAIR 🍐 🤘${RESET}\n"

.PHONY: usage
usage:
	@echo
	@echo "Hi ${GREEN}${USER}!${RESET} Welcome to ${RED}${CURRENT_DIR}${RESET}"
	@echo
	@echo "${YELLOW}make${RESET}                     this handy usage guide"
	@echo
	@echo "${YELLOW}make build${RESET}               full build"
	@echo
