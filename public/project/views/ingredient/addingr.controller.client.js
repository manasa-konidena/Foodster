(function () {
    angular
        .module("FoodsterApp")
        .controller("AddIngrController", AddIngrController);

    function AddIngrController(IngredientService, $routeParams, $location) {
        var vm = this;

        var recipeId = $routeParams.recipeId;
        vm.recipeId = recipeId;
        vm.createIngredient = createIngredient;
        vm.deleteIngredient = deleteIngredient;
        
        function init() {
            IngredientService
                .findIngredientsForRecipe(recipeId)
                .then(
                    function (response) {
                        vm.ingredients = response.data;

                    }
                )
        }
        init();

        function deleteIngredient(ingredientId) {
            IngredientService
                .deleteIngredient(ingredientId)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result){
                            vm.success = "deleted!";
                            IngredientService
                                .findIngredientsForRecipe(recipeId)
                                .then(
                                    function (response) {
                                        vm.ingredients = response.data;

                                    }
                                );
                        }
                    }
                );
        }

        function createIngredient(ingredient) {
            IngredientService
                .createIngredient(recipeId, ingredient)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result) {
                            vm.ingredient.name = null;
                            vm.ingredient.quantity = null;
                            IngredientService
                                .findIngredientsForRecipe(recipeId)
                                .then(
                                    function (response) {
                                        vm.ingredients = response.data;

                                    }
                                );
                        } else{
                            vm.error = "Oh SNAP! Couldnt Add";
                        }
                    }
                );
        }

    }
})();