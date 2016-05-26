(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location) {
        var vm = this;

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];


        vm.login = function(username, password) {
            // console.log(vm.username);

            for(var i in users){
                if(users[i].username === username &&
                    users[i].password === password){

                    // console.log("YAY");
                    $location.url("/user/"+users[i]._id);

                } else {
                    vm.error = "Oh SNAP! User not found";
                }
            }

        }

    }
})();