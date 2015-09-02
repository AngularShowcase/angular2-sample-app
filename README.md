# Introduction

Sample application based upon [mgechev](https://github.com/mgechev)/ [angular2-seed](https://github.com/mgechev/angular2-seed).

[![Join the chat at https://gitter.im/mgechev/angular2-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angular2-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**Note:** Angular 2.0 is not production ready yet! This project is perfect for playing around with the latest versions but do not start new projects with it since a lot of new changes are going to be introduced until the framework is officially released.

# Features

* Component styling
* Custom Directive
* Router module (implementing child routes*)
* Http module
* Form module (using template driven form approach)

~~*Child routes issue: component gets loaded but browser location does not update*~~

# How to start

```bash
git clone https://github.com/mgechev/angular2-seed.git
cd angular2-seed
# If you don't have gulp already installed
npm install -g gulp
npm install
# dev
gulp serve.dev
# test
gulp test
```

# Directory Structure

```
.
├── app
│   ├── components
│   │   ├── about
│   │   │   ├── about.html
│   │   │   └── about.ts
│   │   └── home
│   │       ├── home.html
│   │       └── home.ts
│   ├── services
│   ├── typings
│   ├── app.css
│   ├── app.html
│   ├── app.ts
│   ├── index.html
│   └── init.ts
├── dist
│   ├── dev
│   └── prod
├── tsd_typings
├── gulpfile.js
├── karma.conf.js
├── package.json
├── test-main.js
├── tsconfig.json
└── tsd.json
```

# Configuration

Configure your app base if you serve the app from another directory than root in `gulpfile.js`.
Defaults to `var APP_BASE = '/'`

# Now to extend?

If you want to use your custom libraries:

```bash
npm install my-library --save
vim gulpfile.js
```
Add reference to the installed library in `PATH.src.lib`.

# Contributors

[<img alt="ludohenin" src="https://avatars.githubusercontent.com/u/1011516?v=3&s=117" width="117">](https://github.com/ludohenin) |[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ludohenin](https://github.com/ludohenin) |[NathanWalker](https://github.com/NathanWalker) |

# Change Log

You can follow the [Angular 2 change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT
