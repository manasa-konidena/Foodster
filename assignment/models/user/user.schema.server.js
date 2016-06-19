module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            token: String,
            id: String,
            displayName: String
        },
        dob: Date,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});

    return UserSchema;
};