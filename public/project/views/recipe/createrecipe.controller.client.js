(function () {
    angular
        .module("FoodsterApp")
        .controller("CreateRecipeController", CreateRecipeController);

    function CreateRecipeController(RecipeService, $routeParams, $location) {
        var vm = this;

        var recipeId = $routeParams.recipeId;
        
        vm.updateRecipe = updateRecipe;

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