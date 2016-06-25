(function () {
    angular
        .module("FoodsterApp")
        .controller("AllRecipeController", AllRecipeController);

    function AllRecipeController(RecipeService) {
        var vm = this;

        vm.message = "this";
        
        function init() {
            RecipeService
                .findAllRecipes()
                .then(
                    function (response) {
                        console.log(response);
                        vm.recipes = response.data;
                    }
                );
        }
        init(); 
    }
})();