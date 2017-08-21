const mongoose = require('mongoose');
const UrlMap = mongoose.model('Url');
module.exports = {

    shortenUrl: async(req, res) => {
        let formattedUrl = req.params['0'].substring(0, req.params['0'].length);
        if (validateUrl(formattedUrl)) {
            if (!/^(f|ht)tps?:\/\//i.test(formattedUrl)) formattedUrl = "http://" + formattedUrl;
            let orgUrl = await UrlMap.findOne({ "original_url": formattedUrl });
            if (orgUrl) {
                res.json({ "original_url": formattedUrl, "short_url": orgUrl.short_url });
            }
            else {
                try {
                    const shortCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
                    const shortUrl = req.headers['x-forwarded-proto'] + '://' + req.headers['host'] + '/' + shortCode;
                    const obj = { "original_url": formattedUrl, "short_url": shortUrl };
                    let urlMaped = new UrlMap(obj);
                    urlMaped.shorten_url_id = shortCode;
                    await urlMaped.save();
                }
                catch (e) {
                    console.error("there is error in generating url", e.message);
                    res.json({ "error": "there is error in generating url" });
                }

            }
        }
        else {
            res.json({ "error": "Wrong Url Format." });
        }
    },

    getoriginalUrl: async(req, res) => {

        let urlObj = await UrlMap.findOne({ "shorten_url_id": req.params.shortCode });
        if (urlObj) {
            try {
                await UrlMap.update({ "shorten_url_id": req.params.shortCode }, { $inc: { views: 1 } });
            }
            catch (e) {
                console.log('error', e.message);
            }
            finally {
                res.redirect(urlObj.original_url);
            }
        }
        else {
            res.json({ "error": "No Url Found." });
        }
    },
    getLastGeneratedUrl: async(req, res) => {
        try {
            let urls = await UrlMap.find({}).sort({ createdAt: -1 }).limit(5);
            urls?res.json(urls):res.json({});
        }
        catch (e) {
            res.json({});
        }
    }

};


var validateUrl = (url) => {
    var pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    return pattern.test(url);
};
