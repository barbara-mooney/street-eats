/* eslint-disable max-len */
'use strict';
const loopback = require('loopback');

module.exports = function(Owner) {
  // eslint-disable-next-line no-undef
  Owner.on('resetPasswordRequest', function(info) {
    // var url = 'https://expo.io/--/to-exp/exp%3A%2F%2F192.168.1.34%3A19000%2Freset-password';
    var model = info.options.model;
    var url = 'http://localhost:5500';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '&userId=' + info.accessToken.userId + '&model=' + model + '">here</a> to reset your password';
    console.log(info);
    loopback.Email.send({
      to: info.email,
      from: '7hecano@gmail.com',
      subject: 'Password reset',
      text: 'text message',
      html: html,
    },
    function(err, result) {
      if (err) {
        console.log('Upppss something crash', err);
        return;
      }
    });
  });
};
