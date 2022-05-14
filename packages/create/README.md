# @gwyddion/create

Create a new package meant for packages in the `@gwyddion` scope (but should work for others for the most part).

> created by [create-create-app](https://github.com/uetchy/create-create-app).

## Use

### Scoped with a workspace

```bash
npm init -w packages/<name> @gwyddion . -- --scope=@gwyddion

cd packages && yarn create @gwyddion <name> --scope=@gwyddion
```

### Without a scope

```bash
npm init @gwyddion <package-name>

yarn create @gwyddion <package-name>
```

### Available Flags

* `--template`: Required template to use.  Will be prompted if not provided.  Possible values are:
    * `default` for standard Node.js library
    * `react` for React Component Library

* `--scope`: Optional string scope beginning with `@` (e.g. `@gwyddion`) to prefix the package name.

* `--isGwyddion`: Optional boolean to indicate whether the package is being added to this (`gwyddion-npm`) repo as a workspace.

* `--description`: Required string to describe the library.  Will be prompted if not provided.

* `--license`: Required string with the [SPDX](https://spdx.org/licenses/) license identifier.  Will be prompted if not provided.

* `--author`: Required string for the Author name.  Will be prompted if not provided.

* `--email`: Required string for the author email.  Will be prompted if not provided.
