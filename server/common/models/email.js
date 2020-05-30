// eslint-disable-next-line strict
module.exports = function(MyModel) {
  // send an email
  MyModel.sendEmail = function(cb) {
    MyModel.app.models.Email.send(
      {
        name: 'Email',
        base: 'Model',
        properties: {
          to: {type: 'String', required: true},
          from: {type: 'String', required: true},
          subject: {type: 'String', required: true},
          text: {type: 'String'},
          html: {type: 'String'},
        },
      },
      function(err, mail) {
        console.log('email sent!');
        cb(err);
      }
    );
  };
};
