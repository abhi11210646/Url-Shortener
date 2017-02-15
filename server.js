require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
require("./config/routes/")(app);
require('./config/db')();
app.listen(process.env.PORT_c9, ()=>{
    console.log("server is running on PORT ", process.env.PORT_c9);
});