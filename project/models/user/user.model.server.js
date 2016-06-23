
module.exports = function () {

    var mongoose = require("mongoose");
    var ProUserSchema = require("../user/user.schema.server")();
    var ProUser = mongoose.model("ProUser", ProUserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findAllUsers: findAllUsers,
        addToFavs: addToFavs,
        removeFromFavs: removeFromFavs
        // findFacebookUser: findFacebookUser
    };
    return api;

    // function findFacebookUser(id) {
    //     return User.findOne({"facebook.id": id});
    // }



    function findAllUsers() {
        return ProUser.find();
    }

    function removeFromFavs(userId, recipeId) {
        return ProUser.update(
            {_id: userId},
            {
                $pull: {
                favrecipes: 
                {
                    recipeId: recipeId
                }
                }
            }
        );
    }

    function createUser(user) {
        return ProUser.create(user);
    }

    function findUserById(userId) {
        return ProUser.findById(userId);
    }
    
    function addToFavs(userId, fav) {
        return ProUser.update(
            {_id: userId},
            {$push: {favrecipes: fav}}
        );
    }
    
    function findUserByCredentials(username, password) {
        return ProUser.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        console.log(username);
        return ProUser.findOne({username: username});
    }

    function updateUser(userId, user) {
        delete user._id;
        return ProUser
            .update({_id: userId},{
                $set: user
            });
    }

    function deleteUser(userId){
        return ProUser.remove({_id: userId});
    }


};