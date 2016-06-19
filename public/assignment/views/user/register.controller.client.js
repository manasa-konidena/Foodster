// IIFE
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){
        var vm = this;


        vm.register = register;
        
        function register(newUser) {
            if(vm.myForm.$invalid == true){
                vm.error = "Please check the form and resubmit";
                vm.alert = "* Required Field";
                vm.passwordmatchalert = "Passwords don't match!";
            } else if(newUser.password !== newUser.verpass){
                vm.error = "Please check the form and resubmit";
                vm.alert = "* Required Field";
                vm.passwordmatchalert = "Passwords don't match!";
            } else {
            UserService
                .register(newUser)
                .then(function (response) {
                    var brandNewUser = response.data;
                    if(brandNewUser._id){
                        $location.url("/user");
                    } else {
                        vm.error = response.data;
                    }
                });
            }
        }
    }
})();