





module.exports = function() {
    var mongoose = require("mongoose");

    var RecipeSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "ProUser"},
        name: String,
        servings: Number,
        rating: {type: String, default: "Unrated"},
        imageurl: String,
        course: String,
        cuisine: String,
        preptime: Number,
        cooktime: Number,
        preparationsteps: String,

        likedby: Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.recipe"});

    return RecipeSchema;
};