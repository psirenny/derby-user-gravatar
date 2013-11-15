var gravitate = require('gravitate');

module.exports = function (store, options) {
  if (store && store.hook) {
    var model = store.createModel();
    store.hook('change', 'usersPrivate.*.local.emails.0.value',
      function (userId, email) {
        var $public = model.at('usersPublic.' + userId);

        $public.fetch(function (err) {
          if (err) return console.error(err);
          gravitate.profile.data(email, function (err, data) {
            if (!err) $public.set('gravatar', data.entry[0]);
          });
        });
      }
    );
  }

  return function (req, res, next) {
    if (req.get('Content-Type')) return next();

    var model = req.getModel()
      , userId = model.get('_session.user.id')
      , $public = model.at('usersPublic.' + userId)
      , $private = model.at('usersPrivate.' + userId);

    model.fetch($public, $private, function (err) {
      if (err) return next(err);
      var email = $private.get('local.emails.0.value');
      if (!email) return next();

      gravitate.profile.data(email, function (err, data) {
        if (!err) $public.set('gravatar', data.entry[0]);
        next();
      });
    });
  };
};