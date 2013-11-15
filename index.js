var gravitate = require('gravitate');

module.exports = function (options) {
  return function (req, res, next) {
    if (req.get('Content-Type')) return next();

    var model = req.getModel()
      , userId = model.get('_session.user.id')
      , $private = model.at('usersPrivate.' + userId)
      , $public = model.at('usersPublic.' + userId);

    model.fetch($private, $public, function (err) {
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