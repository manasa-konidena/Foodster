// IIFE
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){
        var vm = this;

        vm.register = function (newUser) {
            var brandNewUser = UserService.createUser(newUser);

            if(brandNewUser){
                $location.url("/user/"+brandNewUser._id);
            } else {
                vm.error = "Oh SNAP! Couldnt register your account";
            }
        }
    }
})();