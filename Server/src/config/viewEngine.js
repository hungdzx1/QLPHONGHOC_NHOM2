const path = require("path");
const express = require("express");

const configView = (app) => {
  //config template egnine
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs"); //dùng ejs

  app.use(express.static(path.join("./src", "public"))); //Cấu hình static
};

module.exports = configView;
