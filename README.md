createp
======

Simple CLI to create a new repo on github

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/createp.svg)](https://npmjs.org/package/createp)

# Install

```sh
npm i -g createp
```

# Usage
- Create a new project:
```sh
$ createp -t <github-token> <project-name>
```
- If in the current folder there's already a folder called "project-name" you can override it with `-f`, otherwise the process will exit:
```sh
$ createp -f -t <github-token> <project-name>
```
- To set a default Github Authorization Token run: (it will be saved in the `.createp-config.json` file in your home folder)
```sh
$ createp -s -t <github-token>
```
- If a default Github Authorization Token is detected, to create a new project run:
```sh
$ createp <project-name>
```

