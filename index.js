var _ = require('lodash');
var async = require('async');
var gravitate = require('gravitate');

module.exports = function () {
  return function (req, res, next) {
    if (!req.isAuthenticated()) return;
    var model = req.getModel();
    var $user = model.at('users.' + req.user.id);
    $user.fetch(function (err) {
      if (err) return next(err);
      var emails = $user.get('local.emails') || [];
      emails = _.pluck(emails, 'value');
      async.map(emails, gravitate.profile.data, function (err, data) {
        if (err) return console.error(err);
        $user.set('gravatars', data);
        next();
      });
    });
  };
};

module.exports.hooks = function () {
  return function (derby) {
    derby.on('store', function (store) {
      store.hook('change', 'users.*.local.emails.*.value',
        function (userId, index, email) {
          var model = store.createModel();
          var $user = model.at('users.' + userId);
          $user.fetch(function (err) {
            if (err) return console.error(err);
            gravitate.profile.data(email, function (err, data) {
              if (err) return console.error(err);
              $user.set('gravatars.' + index, data);
            });
          });
        }
      );
    });
  };
};
