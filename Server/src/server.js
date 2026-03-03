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

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

configView(app);
configSession(app);


app.use(express.json()) //convert data to json
app.use(express.urlencoded({extended: true})) //for form data

app.use(cors({
  origin: `http://127.0.0.1:5500`,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}))

RestAPIs(app);
// app.use('/', webRoutes); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})