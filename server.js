require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
require('./model/tinyUrlmap');
require("./config/routes/")(app);
require('./config/db')();
app.listen(process.env.PORT, ()=>{
    console.log("server is running on PORT ", process.env.PORT);
});