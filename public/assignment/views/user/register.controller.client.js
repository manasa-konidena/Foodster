// IIFE
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){
        var vm = this;


        vm.register = register;
        
        function register(newUser) {
            if(newUser.password !== newUser.verpass){
                vm.error = "Passwords don't match!!";
                
            } else {
            var brandNewUser = UserService.createUser(newUser);

            if(brandNewUser){
                $location.url("/user/"+brandNewUser._id);
            } else {
                vm.error = "Oh SNAP! Username already exists. Please try with another.";
            }
            }
        }
    }
})();