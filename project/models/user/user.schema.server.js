module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        phone: String,
        address: String,
        email: String,
        foodiethought: String,
        type: {type: String, enum: ['ENDUSER', 'ADMIN']},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};