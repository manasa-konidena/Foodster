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
                course: String,
                imageurl: String
            }
        ],
        followingUsers: [
            {
                userId: String,
                username: String,
                foodiethought: String

            }
        ],
        followedByUsers: [
            {
                userId: String,
                username: String,
                foodiethought: String

            }
        ],
        groceryList: [
            {
                ingredient: String
            }
        ],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return ProUserSchema;
};