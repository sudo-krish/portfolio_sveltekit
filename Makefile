# ==============================================================================
# Downstream Makefile for makelib-node (SvelteKit Portfolio)
# ==============================================================================
# Usage:
#   make init        # Automatically adds submodule, installs toolchain & hooks
#   make check-all   # Runs full 8-stage quality gate pipeline
#   make build       # Builds the SvelteKit production bundle
#   make help        # Displays self-documenting help menu
# ==============================================================================

# Makelib repository and directory settings
MAKELIB_REPO ?= https://github.com/sudo-krish/makelib-node.git
MAKELIB_DIR  ?= .makelib

# Downstream Overrides for SvelteKit
SRC_DIR              ?= src
TEST_DIR             ?= tests
DIST_DIR             ?= .svelte-kit/cloudflare
MIN_COVERAGE         ?= 80
BUILD_CMD            ?= $(NPM) run build
VITEST               ?= $(CURDIR)/node_modules/.bin/vitest
VITEST_CONFIG_FLAG   ?= --config vite.config.ts
LICENSE_CHECKER      ?= $(firstword $(wildcard $(CURDIR)/$(MAKELIB_DIR)/node_modules/.bin/license-checker-rseidelsohn) license-checker-rseidelsohn) --excludePrivatePackages --excludePackages 'gsap@3.14.2;@threejs-kit/instanced-sprite-mesh@2.5.1;@sentry/cli@2.58.6;@sentry/cli-linux-x64@2.58.6;@img/sharp-libvips-linux-x64@1.3.4;@img/sharp-libvips-linuxmusl-x64@1.3.4;caniuse-lite@1.0.30001823;glob@13.0.7;lru-cache@11.5.0;minimatch@10.2.6;minipass@7.1.3;path-scurry@2.0.2;lightningcss@1.30.2;lightningcss-linux-x64-gnu@1.30.2;lightningcss-linux-x64-musl@1.30.2'

.PHONY: init init-makelib update update-makelib svelte-sync

init: init-makelib
update: update-makelib

svelte-sync: ## Sync SvelteKit generated types (.svelte-kit/tsconfig.json)
	@$(NPX) svelte-kit sync

type-check: svelte-sync

init-makelib: ## Initialize makelib as a submodule, install toolchain, and set up git hooks
	@if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then \
		echo "Initializing Git repository..."; \
		git init; \
	fi
	@if [ ! -e "$(MAKELIB_DIR)/.git" ]; then \
		if git config --file .gitmodules --get "submodule.$(MAKELIB_DIR).url" >/dev/null 2>&1; then \
			echo "Initializing existing submodule in $(MAKELIB_DIR)..."; \
			git -c protocol.file.allow=always submodule update --init --recursive $(MAKELIB_DIR) || \
			git -c protocol.file.allow=always submodule add --force $(MAKELIB_REPO) $(MAKELIB_DIR); \
		else \
			echo "Adding makelib-node submodule into $(MAKELIB_DIR)..."; \
			git -c protocol.file.allow=always submodule add --force $(MAKELIB_REPO) $(MAKELIB_DIR); \
		fi; \
	else \
		echo "Submodule $(MAKELIB_DIR) already present. Updating..."; \
		git -c protocol.file.allow=always submodule update --init --recursive $(MAKELIB_DIR); \
	fi
	@echo "Installing isolated makelib toolchain in $(MAKELIB_DIR)..."
	@npm --prefix "$(MAKELIB_DIR)" install
	@if [ -f "$(MAKELIB_DIR)/scripts/install-hooks.sh" ]; then \
		bash "$(MAKELIB_DIR)/scripts/install-hooks.sh"; \
	fi
	@if [ -f "$(MAKELIB_DIR)/scripts/setup-ci.sh" ]; then \
		bash "$(MAKELIB_DIR)/scripts/setup-ci.sh"; \
	fi
	@echo "makelib-node initialized successfully! Run 'make check-all' or 'make help'."

update-makelib: ## Update makelib submodule to latest remote revision
	@echo "Updating makelib-node submodule in $(MAKELIB_DIR)..."
	@git -c protocol.file.allow=always submodule update --remote --merge $(MAKELIB_DIR)
	@npm --prefix "$(MAKELIB_DIR)" install
	@echo "makelib-node updated successfully."

# Include makelib core library
-include $(MAKELIB_DIR)/core.mk

# If makelib is not yet initialized and user runs another target, auto-initialize
ifeq ($(wildcard $(MAKELIB_DIR)/core.mk),)
.DEFAULT_GOAL := help-uninitialized

help-uninitialized:
	@echo "makelib-node is not initialized in '$(MAKELIB_DIR)'."
	@echo "Run 'make init' to automatically add the submodule and configure the toolchain."

%:
	@echo "makelib-node is not initialized in '$(MAKELIB_DIR)'. Auto-initializing..."
	@$(MAKE) init
	@$(MAKE) $@
endif
