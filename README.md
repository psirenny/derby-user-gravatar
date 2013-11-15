derby-user-gravatar
===================

Adds [Gravatar](http://www.gravatar.com) support to [derby-user](https://github.com/psirenny/derby-user).  
**Note:** Add [racer-hooks](https://github.com/psirenny/racer-hooks) to your app so that gravatar data updates in real time after a user changes their email address.

Installation
------------

    $ npm install derby-user-gravatar

In *"/lib/server/index.js"*

    var gravatar = require('derby-user-gravatar');

    expressApp
      // ...
      .use(user.init())
      .use(gravatar(store))
      // ...
