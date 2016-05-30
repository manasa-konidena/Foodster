(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function UserService() {
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
           for(var i in users){
               if(users[i].username === username){
                   if(users[i].password === password){
                       return users[i];
                   }else {
                       return "Pinc";
                   }
               }
           }
            return "Unof";

            // for(var i in users){
            //     if(users[i].username === username &&
            //         users[i].password === password){
            //         return users[i];
            //     }
            // }
            // return null;
        }

        function findUserById(userId) {
            for(var i in users){
                if(users[i]._id === userId){
                    return users[i];
                }
            }
            return null;
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
