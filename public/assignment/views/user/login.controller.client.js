(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {

            var result = UserService.findUserByCredentials(username, password);

            console.log(result);

            if(result === "Unof"){
                vm.error = "Username doesn't exist. Please Register.";
            } else{
                if(result === "Pinc"){
                    vm.error = "Password is incorrect. Please try again!";
                } else {
                    $location.url("/user/"+result._id);
                }
            }
        }
            //
            // switch (user){
            //     case "Pinc":
            //         vm.error = "Password is incorrect. Please try again!";
            //     case "Unof":
            //         vm.error = "Username doesn't exist. Please register.";
            //     default:
            //         $location.url("/user/"+user._id);
            // }
        // 
        //     if(user === "Pinc") {
        //         vm.error = "Password is incorrect. Please try again!";
        //     } if (user) {
        //         $location.url("/user/"+user._id);
        //     } else {
        //         vm.error = "Oh SNAP! User not found";
        //     }

    }
})();