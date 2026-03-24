const express = require('express');
const path =  require('path');
require('dotenv').config();
const connection = require('./config/database');
const configView = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const configSession = require('./config/session');
const RestAPIs = require('./routes/api');
const cors = require('cors');



const app = express();

configView(app);

app.use(cors({
  origin: `http://127.0.0.1:5500`,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

configSession(app);

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;


app.use(express.json()) //convert data to json
app.use(express.urlencoded({extended: true})) //for form data

// console.log(path.join(__dirname, "../../Client/login.html"));

RestAPIs(app);
// app.use('/', webRoutes); 

app.listen(port, hostname , () => {
  console.log(`Example app listening on port ${hostname}:${port}`)
});