
module.exports = function() {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/assignment5610');

    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")(),
       };
    return models;
};