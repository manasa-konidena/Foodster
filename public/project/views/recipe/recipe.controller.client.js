(function () {
    angular
        .module("FoodsterApp")
        .controller("RecipeController", RecipeController);

    function RecipeController(YummlyService, $routeParams, RecipeService) {
        var vm = this;
        var recipeId = $routeParams.recipeId;

        function init() {
            if(recipeId.indexOf("-") > -1){
                YummlyService
                    .getFullRecipe(recipeId)
                    .then(function (response) {
                        // console.log(response.data);
                        vm.recipe = response.data;

                    });
            } else {
                RecipeService
                    .findRecipeById(recipeId)
                    .then(
                        function (response) {

                            vm.userrecipe = response.data;

                        }
                    );
            }

        }
        init(); 
    }
})();