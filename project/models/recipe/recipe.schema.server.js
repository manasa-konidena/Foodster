module.exports = function() {
    var mongoose = require("mongoose");

    var RecipeSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: String,
        servings: Number,
        rating: Number,
        course: String,
        cuisine: String,
        holiday: String,
        ingredients: [],
        likedby: Number
    }, {collection: "project.recipe"});

    return RecipeSchema;
};