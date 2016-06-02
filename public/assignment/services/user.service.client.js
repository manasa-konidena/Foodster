(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(newUser){
            // for(var i in users){
            //     if(newUser.username === users[i].username){
            //         return null;
            //     }
            // }
            if(findUserByUsername(newUser.username)){
                return null;
            } else {
                var brandNewUser = {
                    _id: (new Date()).getTime()+"",
                    username: newUser.username,
                    password: newUser.password
                };

                users.push(brandNewUser);
                return brandNewUser;
            }
        }


        function findUserByCredentials(username, password){
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findUserById(userId) {

        }

        function findUserByUsername(username){
            for(var i in users){
                if(username === users[i].username){
                    return users[i];
                }
            }
            return null;
        }

        function updateUser(userid, newUser) {

            for(var i in users){
                if(users[i]._id === userid){
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId) {
            for(var i in users){
                if(userid === users._id){
                    users.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
