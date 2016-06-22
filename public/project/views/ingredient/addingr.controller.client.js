(function () {
    angular
        .module("FoodsterApp")
        .controller("AddIngrController", AddIngrController);

    function AddIngrController(RecipeService, $routeParams, $location) {
        var vm = this;

        var recipeId = $routeParams.recipeId;
        vm.addIngredient = addIngredient;
        
        function init() {
            RecipeService
                .findIngrForRecipe(recipeId)
                .then(
                    function (response) {
                        vm.ingredients = response.data;
                    }
                )
        }
        init();

        function addIngredient(ingredient) {
            RecipeService
                .addIngredient(recipeId, ingredient)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result) {
                            vm.success = "Successfully Added!"
                        } else{
                            vm.error = "Oh SNAP! Couldnt Add";
                        }
                    }
                );
        }

    }
})();