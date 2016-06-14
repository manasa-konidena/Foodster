(function () {
    angular
        .module("FoodsterApp")
        .controller("RecipeController", RecipeController);

    function RecipeController(YummlyService, $routeParams) {
        var vm = this;
        var recipeId = $routeParams.recipeId;

        function init() {
            YummlyService
                .getFullRecipe(recipeId)
                .then(function (response) {
                    console.log(response.data);
                    vm.recipe = response.data;

                });
        }
        init(); 
    }
})();