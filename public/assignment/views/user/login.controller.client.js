(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            if(vm.myForm.$invalid == true){
                vm.error = "Please check requirements and submit again!";
                vm.alert = "* Required Field";
            } else {

            UserService
                .login(username, password)
                .then(function(response){
                var user = response.data;
                if(user){
                    $location.url("/user");
                } else{
                    vm.error = "Error in Login";
                }
            });
            }
        }
    }
})();