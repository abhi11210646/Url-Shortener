
module.exports = {
    
    shortenUrl:(req, res) => {
        var formattedUrl = req.params['0'].substring(0, req.params['0'].length);
     if(validateUrl(formattedUrl)){
        res.json({"original_url":formattedUrl,"short_url":"salman ka fan"});
     }else {
         res.json({"error":"Wrong Url Format."});
     }
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