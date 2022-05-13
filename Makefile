.PHONY: help install setup test-ci lint lint-ci lint-staged check build verify package precommit changeset publish

.DEFAULT: help

help:
	@echo "make install"
	@echo "    install dependencies"
	@echo ""
	@echo "make setup"
	@echo "    install dependencies and git hooks"
	@echo ""
	@echo "make test-ci"
	@echo "    Run tests with CI configuration"
	@echo ""
	@echo "make lint"
	@echo "    Run lint (auto-fix errors)"
	@echo ""
	@echo "make lint-ci"
	@echo "    Run lint (fail if errors)"
	@echo ""
	@echo "make lint-staged"
	@echo "    Run linting on staged files (auto-fix errors)"
	@echo ""
	@echo "make check"
	@echo "    Build the Typescript packages without creating dist files"
	@echo ""
	@echo "make build"
	@echo "    Build the Typescript packages"
	@echo ""
	@echo "make verify"
	@echo "    verify tests, linting, and compilation"
	@echo ""
	@echo "make package name=<pkg-name>"
	@echo "    add a new package to the repo"
	@echo ""
	@echo "make precommit"
	@echo "    run all pre-commit hook checks"
	@echo ""
	@echo "make changeset"
	@echo "    Generate a changeset"
	@echo ""
	@echo "make publish"
	@echo "    Publish the current changes (meant for automation only)"
	@echo ""

install:
	yarn install --frozen-lockfile

setup: install
	yarn run husky install

test-ci:
	yarn run test

lint:
	yarn run lint

lint-ci:
	yarn run lint:ci

lint-staged:
	yarn run lint-staged

check:
	yarn run check

build:
	yarn run build

verify: install test-ci lint-ci build

package:
	yarn run @gwyddion/create --scope=@gwyddion --isGwyddion=true --license=ISC

precommit: check lint-staged

changeset:
	yarn run changeset

publish: build
	yarn run package
	yarn run changeset publish
