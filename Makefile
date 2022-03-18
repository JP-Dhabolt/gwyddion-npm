template-path = internal/create/template
package-path = packages/${name}
jest-config = jest.config.js
ts-config = tsconfig.json

.PHONY: help install setup package

.DEFAULT: help

help:
	@echo "make install"
	@echo "    install dependencies"
	@echo ""
	@echo "make setup"
	@echo "    install dependencies and git hooks"
	@echo ""
	@echo "make package name=<pkg-name>"
	@echo "    add a new package to the repo"

install:
	npm ci

setup: install
	npx husky install

package:
	npm init --scope=@gwyddion -y -w ${package-path}
	cp ${template-path}/${jest-config} ${package-path}/${jest-config}
	cp ${template-path}/${ts-config} ${package-path}/${ts-config}
