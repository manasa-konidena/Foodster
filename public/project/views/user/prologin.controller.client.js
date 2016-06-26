(function(){
    angular
        .module("FoodsterApp")
        .controller("ProLoginController", LoginController);


    function LoginController($location, UserService, $rootScope) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            if(vm.myForm.$invalid == true){
                vm.error = "Please check requirements and submit again!";
                vm.alert = "* Required Field";
            } else {
            UserService
                .login(username, password)
                .then(function(response) {
                var user = response.data;
                if(user._id){
                    if($rootScope.previousUrl){
                        $location.url($rootScope.previousUrl);
                        $rootScope.previousUrl = null;
                    } else {
                        $location.url("/welcomepage")
                    }

                } else{
                    vm.error = "Hell's naw!"
                }
            });
            }
        }
    }
})();