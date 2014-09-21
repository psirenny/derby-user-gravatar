Derby User Gravatar
===================

Adds support for [Gravatar](http://www.gravatar.com) to [derby-user](https://github.com/psirenny/derby-user).
An array of gravatar data is written to `users.*.gravatars` for each email address in `users.*.local.emails`.

Installation
------------

    $ npm install derby-user-gravatar --save

Usage
-----

In your server file, add the middleware:

    var gravatar = require('derby-user-gravatar');

    expressApp
      // ...
      // ...
      // ...
      .use(user.init())
      .use(gravatar())

Hooks
-----

Use `gravatar.hooks()` to have gravatar data update in real time when a user changes their email address.

    derby.use(gravatar.hooks());

Dependencies
------------

Requires [derby-hook](https://github.com/derbyparty/derby-hook) in order to use `gravatar.hook()`.

Usage
-----

    var derby = require('derby');
    var gravatar = require('derby-user-gravatar');
    var hooks = require('racer-hooks');
    // ...
    // ...

    var store = derby.createStore({...});
    hooks(store);

    derby
      // racerBundle
      // ...
      .use(hooks())
      .use(gravatar.hooks());
