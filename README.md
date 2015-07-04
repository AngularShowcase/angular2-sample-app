# Introduction

Sample application based upon [mgechev](https://github.com/mgechev) [angular2-seed](https://github.com/mgechev/angular2-seed).

[![Join the chat at https://gitter.im/mgechev/angular2-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angular2-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**Note:** Angular 2.0 is not production ready yet! This project is perfect for playing around with the latest versions but do not start new projects with it since a lot of new changes are going to be introduced until the framework is officially released.

# Features

* Component styling
* Router and child routes
* Http

# How to start

```bash
git clone https://github.com/AngularShowcase/angular2-sample-app.git
cd angular2-sample-app
npm install
# If you don't have gulp already installed
npm install -g gulp
# dev
gulp serve.dev
# prod
gulp serve.prod
```

# Now to extend?

If you want to use your custom libraries:

```bash
npm install my-library --save
vim gulpfile.js
```
Add reference to the installed library in `PATH.src.lib`.

# Contribution

Any contribution is very much welcome.

# Change Log

You can follow the [Angular 2 change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT
