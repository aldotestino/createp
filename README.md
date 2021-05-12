rcreate
======

Simple CLI to create a new repo on github

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rcreate.svg)](https://npmjs.org/package/rcreate)

# Install

```sh
npm i -g rcreate
```

# Usage
- Create a new project:
```sh
$ rcreate -t <github-token> <project-name>
```
- If in the current folder there's already a folder called "project-name" you can override it with `-f`, otherwise the process will exit:
```sh
$ rcreate -f -t <github-token> <project-name>
```
- To set a default Github Authorization Token run: (it will be saved in the `.rcreate-config.json` file in your home folder)
```sh
$ rcreate -s -t <github-token>
```
- If a default Github Authorization Token is detected, to create a new project run:
```sh
$ rcreate <project-name>
```
