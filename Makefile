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

.PHONY: find-conflict-lint-config
find-conflict-lint-config:
	@for i in $$(seq 1 $$(pwd | awk -F'/' '{print NF-1}')); do \
		dirs=$$(printf '../%.0s' $$(seq 1 $$i)); \
		find "$$dirs" -maxdepth 1 -type f -name "eslint.config.*"; \
	done;

.PHONY: format-check
format-check:
	npm run format:check

.PHONY: test-unit
test-unit:
	npm run test:unit:coverage

.PHONY: test-a11y
test-a11y:
	npm run test:a11y

.PHONY: test-e2e
test-e2e:
	npm run test:e2e

.PHONY: build
build: check install lint format-check test-unit test-a11y
	@echo
	@echo "✅ ${GREEN}Success${RESET} you are ready to ${BOLD}${MAGENTA}PAIR 🍐 🤘${RESET}\n"

.PHONY: full-build
full-build: build test-e2e
	@echo
	@echo "✅ ${GREEN}Success${RESET} you are ready to ${BOLD}${MAGENTA}PAIR 🍐 🤘${RESET}\n"

.PHONY: cloudflared-setup
cloudflared-setup:
	@brew --version >> /dev/null && \
		brew install cloudflared || \
		{ echo "${RED}❌ Couldn't detect Homebrew${RESET}"; exit 1; }
	# requires $$CLOUDFLARED_KEY and sudo
	sudo cloudflared service install "$${CLOUDFLARED_KEY}"
	@cloudflared tunnel login
	@cloudflared tunnel list --name the-martec

.PHONY: cloudflared-test
cloudflared-test:
	@cloudflared tunnel list --name the-martec

.PHONY: cloudflared-tail
cloudflared-tail:
	@echo "${GREEN}tailing a cloudflared tunnel named the-martec ... ${RESET}"
	@export MARTEC_TUNNEL=$$( \
		cloudflared tunnel list \
			--name the-martec \
			--output json | \
			jq '.[].id'\
		) && \
		cloudflared tail $${MARTEC_TUNNEL}

.PHONY: cloudflared-teardown
cloudflared-teardown:
	# requires $$CLOUDFLARED_KEY and sudo
	sudo cloudflared service uninstall "$${CLOUDFLARED_KEY}"
	@cloudflared tunnel login
	@cloudflared tunnel list --name the-martec

.PHONY: usage
usage:
	@echo
	@echo "Hi ${GREEN}${USER}!${RESET} Welcome to ${RED}${CURRENT_DIR}${RESET}"
	@echo
	@echo "${YELLOW}make${RESET}                     this handy usage guide"
	@echo
	@echo "${YELLOW}make build${RESET}               basic build"
	@echo "${YELLOW}make full-build${RESET}          full build including e2e tests"
	@echo
