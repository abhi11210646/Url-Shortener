var express = require("express");
var router = express.Router();
var urlShortenController = require("./../../controller/url-shortener");
module.exports = () =>{
    
    router.get('/url/*', urlShortenController.shortenUrl);
    
    return router;
    
}