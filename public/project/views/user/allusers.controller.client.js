(function(){
    angular
        .module("FoodsterApp")
        .controller("AllUserController", AllUserController);

    function AllUserController(UserService, $location){
        var vm = this;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login")
                    },
                    function (err) {
                        $location.url("/login")
                    }
                )
        }
        function init(){
            UserService
                .findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                });
        }
        init();


    }
})();