# nappjs

NodeJS application stack

[![Build Status](https://travis-ci.org/nappjs/nappjs.svg?branch=master)](https://travis-ci.org/nappjs/nappjs)

# structure

* schema - folder containing schema versions
* plugins (optional) - connect middlewares that are included into rest api
* middlewares (optional) - similar as plugins, but for project specific logic
* seeds (optional) - seed data in folder structure

# Plugins

Plugins can also be load from local and global node_modules. Each module must
have prefix `nappjs-` to be loaded. Loading global modules is disabled by
default, but you can enable it by setting environment variable:
`LOAD_GLOBAL_PLUGINS=true`
