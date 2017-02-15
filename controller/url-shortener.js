var mongoose = require('mongoose');
var UrlMap = mongoose.model('Url');
module.exports = {
    
    shortenUrl:(req, res) => {
        var formattedUrl = req.params['0'].substring(0, req.params['0'].length);
     if(validateUrl(formattedUrl)){
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
                if(urlObj.original_url) {
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
    console.log("url-->>",url);
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(url);
    
};