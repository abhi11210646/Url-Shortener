var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlMaped = new Schema({
        "shorten_url_id":{
            "type": Number
        },
        "original_url":{
            "type" : String,
            "trim" : true
        },
        "shorten_url":{
            "type" : String,
            "trim" : true
        },
  });
  var urlMapedSchema = mongoose.model('Url',urlMaped);
  module.exports = urlMapedSchema;