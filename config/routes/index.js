

module.exports = (app) => {
    app.use('/',require("./router")());
}