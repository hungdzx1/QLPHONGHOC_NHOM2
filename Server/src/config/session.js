const session = require('express-session');



const configSession = (app) => {
  app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000 // 1 giờ
      }
    })
  );
};


module.exports = configSession;