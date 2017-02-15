var mongoose = require('mongoose');
var UrlMap = mongoose.model('Url');
module.exports = {
    
    shortenUrl:(req, res) => {
        var formattedUrl = req.params['0'].substring(0, req.params['0'].length);
     if(validateUrl(formattedUrl)){
          if (!/^(f|ht)tps?:\/\//i.test(formattedUrl)) {
             formattedUrl = "http://" + formattedUrl;
         }
         var shortCode = Math.floor(Math.random()*(9999-1000)+1000);
         var shortUrl = req.headers['x-forwarded-proto'] +'://'+req.headers['host']+'/'+shortCode;
         var obj  = {"original_url":formattedUrl,"short_url": shortUrl };
         var urlMaped = new UrlMap(obj);
         urlMaped.shorten_url_id = shortCode; 
         urlMaped.save().then((data) => {
             res.json(obj);
         }).catch((error)=>{
             console.error("kucch ko gadbad hai", error);
         });
     }else {
         res.json({"error":"Wrong Url Format."});
     }
    },
    
    getoriginalUrl:(req, res) =>{
        UrlMap.findOne({"shorten_url_id": req.params.shortCode}).then((urlObj)=>{
                if(urlObj) {
                    res.redirect(urlObj.original_url);
                }else {
                    res.json({"error": "No Url Found."});
                }
        }).catch((error)=>{
            console.error("bhaiyya kuch to gadbad hai", error);
        });
    }
    
}


var validateUrl = (url) =>{
     var pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
      console.log("url-->>",url,"valid",pattern.test(url));
      return pattern.test(url);
};