
module.exports = function() {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/assignment5610');

    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")()
        // TODO: add all the toher models: websiteModel, pageModel, widgetModel
    };
    return models;
};