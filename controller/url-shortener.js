const mongoose = require('mongoose');
const UrlMap = mongoose.model('Url');
module.exports = {

    shortenUrl: (req, res) => {
        const formattedUrl = req.params['0'].substring(0, req.params['0'].length);
        if (validateUrl(formattedUrl)) {
            if (!/^(f|ht)tps?:\/\//i.test(formattedUrl)) {
                formattedUrl = "http://" + formattedUrl;
            }
            UrlMap.findOne({ "original_url": formattedUrl }).then((orgUrl) => {
                if (orgUrl) {
                    res.json({ "original_url": formattedUrl, "short_url": orgUrl.short_url });
                }
                else {
                    const shortCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
                    const shortUrl = req.headers['x-forwarded-proto'] + '://' + req.headers['host'] + '/' + shortCode;
                    const obj = { "original_url": formattedUrl, "short_url": shortUrl };
                    const urlMaped = new UrlMap(obj);
                    urlMaped.shorten_url_id = shortCode;
                    urlMaped.save().then((data) => {
                        res.json(obj);
                    }).catch((error) => {
                        console.error("there is error in generating url", error);
                        res.json({ "error": "there is error in generating url" });
                    });
                }
            });
        }
        else {
            res.json({ "error": "Wrong Url Format." });
        }
    },

    getoriginalUrl: (req, res) => {
        UrlMap.findOne({ "shorten_url_id": req.params.shortCode }).then((urlObj) => {
            if (urlObj) {
                UrlMap.update({ "shorten_url_id": req.params.shortCode }, { $inc: { views: 1 } }).then(() => {
                    res.redirect(urlObj.original_url);
                });
            }
            else {
                res.json({ "error": "No Url Found." });
            }
        }).catch((error) => {
            console.error("there is error in findind short url to original_url", error);
            res.json({ "error": "there is error in findind short url to original_url" });
        });
    },
    getLastGeneratedUrl: (req, res) => {
        UrlMap.find({}).sort({ createdAt: -1 }).limit(5).then((urls) => {
            res.json(urls);
        }).catch(()=> res.json({}));
    }

};


var validateUrl = (url) => {
    var pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    return pattern.test(url);
};
