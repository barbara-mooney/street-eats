/* eslint-disable max-len */
/* eslint-disable no-undef */
// eslint-disable-next-line strict
module.exports = function(app) {
  var Customer = app.models.Customer;
  var Owner = app.models.Owner;
  app.post('/request-password-reset-customers', function(req, res, next) {
    // eslint-disable-next-line no-undef
    Customer.resetPassword({
      email: req.body.email,
      model: req.body.model,
    }, function(err) {
      if (err) console.log(err);
      res.end();
    });
  });
  app.post('/request-password-reset-owners', function(req, res, next) {
    // eslint-disable-next-line no-undef
    Owner.resetPassword({
      email: req.body.email,
      model: req.body.model,
    }, function(err) {
      if (err) console.log(err);
      res.end();
    });
  });
};
