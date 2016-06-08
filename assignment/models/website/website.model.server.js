
module.exports = function () {

    var mongoose = require("mongoose")
    var WebsiteSchema = require("./website.schema.server")();
    var User = mongoose.model("Website", WebsiteSchema);

    var api = {
    
    };
    return api;

    function createUser(user) {
        console.log("user.model.server.createUser()");
        console.log(user);
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, user) {
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deleteUser(userId){
        return User.remove({_id: userId});
    }


};