





module.exports = function() {
    var mongoose = require("mongoose");

    var IngredientSchema = mongoose.Schema({
        _recipe: {type: mongoose.Schema.ObjectId, ref: "Recipe"},
        name: String,
        quantity: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.ingredient"});

    return IngredientSchema;
};