(function () {
    angular
        .module("FoodsterApp")
        .controller("AdminRecipesController", AdminRecipesController);

    function AdminRecipesController(UserService, RecipeService) {
        var vm = this;
        vm.deleteRecipe = deleteRecipe;
        vm.setFlaggedFalse = setFlaggedFalse;
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

        function deleteRecipe(recipeId) {
            RecipeService
                .deleteRecipe(recipeId)
                .then(
                    function (response) {
                        vm.warning = "Deleted Successfully!";
                        RecipeService
                            .findAllRecipes()
                            .then(
                                function (response) {
                                    vm.recipes = response.data;
                                }
                            );
                    }
                )
        }

        function setFlaggedFalse(recipeId) {
            RecipeService
                .setFlaggedFalse(recipeId)
                .then(
                    function (response) {
                        vm.set = "Set Successfully!";
                        vm.warning = null;
                        RecipeService
                            .findAllRecipes()
                            .then(
                                function (response) {
                                    vm.recipes = response.data;
                                }
                            );
                    }
                )
        }

        function init() {
            RecipeService
                .findAllRecipes()
                .then(
                    function (response) {
                        vm.recipes = response.data;
                    }
                );
        }
        init();

    }
})();