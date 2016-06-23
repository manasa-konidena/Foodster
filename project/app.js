module.exports = function (app) {

    var promodels = require("../project/models/models.server")();
    
    require("../project/services/user.service.server")(app, promodels);
    require("../project/services/recipe.service.server")(app, promodels);
    require("../project/services/ingredient.service.server")(app, promodels);


    app.get("/say/:something", function (req, res) {
        var msg = req.params['something'];
        res.send({message: msg})
    });

};