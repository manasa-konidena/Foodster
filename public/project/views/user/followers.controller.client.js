(function(){
    angular
        .module("FoodsterApp")
        .controller("FollowersController", FollowersController);

    function FollowersController(UserService, $rootScope, $location){
        var vm = this;
        var userId = $rootScope.currentUser._id;

        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }

        function init() {
            UserService
                .findUserById(userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                    }
                )
        }
        init();

    }
})();