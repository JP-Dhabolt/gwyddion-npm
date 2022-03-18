# gwyddion-npm

This repository is the host of packages published under the `@gwyddion` scope in NPM.

Please see the README.md files under each package for additional information regarding that package.

## Development

This repo has a VS Code Remote Container / Github Codespaces definition to codify the development environment.
If you have forked this repo with the intent of contributing back, please use these environments to ensure full compatibility.

## Changesets

When making changes to any packages, please run `make changesets` and follow the prompts to ensure the changeset is captured.
This will ensure that the appropriate semver bumps are followed when publishing packages, and the patch notes are accurate.
