(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {

            UserService
                .login(username, password)
                .then(function(response){
                var user = response.data;
                if(user){
                    $location.url("/user/"+ user._id);
                } else{
                    vm.error = "Error in Login";
                }
            });
        }
    }
})();