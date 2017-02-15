var express = require("express");
var path = require('path');
var router = express.Router();
var urlShortenController = require("./../../controller/url-shortener");
module.exports = () =>{
    
    router.get('/url/*', urlShortenController.shortenUrl);
    router.get('/:shortCode',urlShortenController.getoriginalUrl);
    router.get('/', (req, res)=>{
        res.sendFile(path.join(__dirname, '..','..', 'view','index.html'));
    });
    return router;
    
}