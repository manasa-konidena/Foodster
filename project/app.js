module.exports = function (app) {

    var models = require("./models/models.server")();
    
    require("./services/user.service.server.js")(app, models);
    require("./services/recipe.service.server.js")(app, models);
    

    app.get("/say/:something", function (req, res) {
        var msg = req.params['something'];
        res.send({message: msg})
    });

};