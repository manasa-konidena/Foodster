(function () {
    angular
        .module("FoodsterApp")
        .controller("FavController", FavController);

    function FavController(UserService, $rootScope) {
        var vm = this;
        var userId = $rootScope.currentUser._id;

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