(function () {
    angular
        .module("FoodsterApp")
        .controller("RecipeListController", RecipeListController);

    function RecipeListController(RecipeService, UserService, $location, $rootScope) {
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
            RecipeService
                .findRecipesByUser(userId)
                .then(
                    function (response) {
                        vm.recipes = response.data;
                    }
                );
        }
        init(); 
    }
})();