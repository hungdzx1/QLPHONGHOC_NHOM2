const session = require("express-session");

const configSession = (app) => {
  app.use(
    session({
      name: "connect.sid",
      secret: "secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax", // hoặc "none" nếu cross-site
        secure: false
      }
    })
  );
};

module.exports = configSession;

