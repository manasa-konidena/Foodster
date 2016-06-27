(function () {
    angular
        .module("FoodsterApp")
        .controller("AdminController", AdminController);

    function AdminController(RecipeService, UserService, $rootScope, $location) {
        var vm = this;

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
            RecipeService
                .findAllRecipes()
                .then(
                    function (response) {
                        vm.recipeCount = response.data.length;
                    }
                );

            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        vm.userCount = response.data.length;
                    }
                );
        }
        init();

    }
})();