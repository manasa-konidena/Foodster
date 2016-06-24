module.exports = function() {
    var mongoose = require("mongoose");

    var ProUserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        phone: String,
        address: String,
        email: String,
        google: {
            id:    String,
            token: String
        },
        foodiethought: String,
        type: {type: String, enum: ['ENDUSER', 'ADMIN']},
        favrecipes: [
            {
                recipeName: String,
                recipeId: String,
                recipeRating: String
            }
        ],
        followingUsers: [
            {
                userId: String,
                username: String

            }
        ],
        followedByUsers: [
            {
                userId: String,
                username: String

            }
        ],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return ProUserSchema;
};