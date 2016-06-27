(function () {
    angular
        .module("FoodsterApp")
        .controller("FavController", FavController);

    function FavController(UserService, $rootScope, $location) {
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
                        var user = response.data;
                        vm.favrecipes = user.favrecipes;
                    }
                );
        }
        init(); 
    }
})();