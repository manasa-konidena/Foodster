// IIFE
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){
        var vm = this;


        vm.register = register;
        
        function register(newUser) {
            UserService
                .createUser(newUser)
                .then(function (response) {
                    var brandNewUser = response.data;
                    if(brandNewUser._id){
                        $location.url("/user/"+brandNewUser._id);
                    } else {
                        vm.error = response.data;
                    }
                })
        }
    }
})();