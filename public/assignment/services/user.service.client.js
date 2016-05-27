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
            var brandNewUser = {
                _id: (new Date()).getTime()+"",
                username: newUser.username,
                password: newUser.password
            };

            users.push(brandNewUser);
            return brandNewUser;
        }


        function findUserByCredentials(username, password){
            for(var i in users){
                if(users[i].username === username &&
                    users[i].password === password){
                    return users[i];
                }
            }
            return null;
        }

        function findUserById(id) {
            for(var i in users){
                if(users[i]._id === id){
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

        function updateUser(id, newUser) {
            console.log(newUser);
            for(var i in users){
                if(users[i]._id === id){
                    users[index].firstName = newUser.firstName;
                    users[index].lastName = newUser.lastName;
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
