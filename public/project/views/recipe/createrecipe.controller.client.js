(function () {
    angular
        .module("FoodsterApp")
        .controller("CreateRecipeController", CreateRecipeController);

    function CreateRecipeController(UserService, $rootScope, RecipeService, $routeParams, $location) {
        var vm = this;

        var recipeId = $routeParams.recipeId;
        vm.recipeId = recipeId;
        vm.updateRecipe = updateRecipe;
        vm.deleteRecipe= deleteRecipe;

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
                .findRecipeById(recipeId)
                .then(
                    function (response) {
                        vm.recipe = response.data;
                    }
                );
        }
        init();

        function deleteRecipe(recipeId) {
            RecipeService
                .deleteRecipe(recipeId)
                .then(
                    function (response) {
                        $location.url("/welcomepage");
                    }
                )
        }

        function updateRecipe(recipe) {
            RecipeService
                .updateRecipe(recipeId, recipe)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result) {
                            $location.url("/addingredients/"+ recipeId);
                        } else{
                            vm.error = "Oh SNAP! Not able to create a recipe";
                        }
                    }
                );
        }

    }
})();