(function () {
    angular
        .module("FoodsterApp")
        .controller("CreateRecipeController", CreateRecipeController);

    function CreateRecipeController(RecipeService, $rootScope, $location) {
        var vm = this;

        var userId = $rootScope.currentUser._id;
        vm.createRecipe = createRecipe;

        function createRecipe(recipe) {
            RecipeService
                .createRecipe(userId, recipe)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result) {
                            $location.url("/myrecipes");
                        } else{
                            vm.error = "Oh SNAP! Not able to create a recipe";
                        }
                    }
                );
        }

    }
})();