(function () {
    angular
        .module("FoodsterApp")
        .controller("RecipeController", RecipeController);

    function RecipeController(YummlyService, $rootScope, $routeParams, RecipeService, IngredientService, UserService) {
        var vm = this;
        var recipeId = $routeParams.recipeId;
        var userId = $rootScope.currentUser._id;
        vm.addToFavs = addToFavs;

        function addToFavs(recipeName, recipeId, recipeRating) {
            var fav = {
                recipeName: recipeName,
                recipeId: recipeId,
                recipeRating: recipeRating
            };
            

            UserService
                .addToFavs(userId, fav)
                .then(
                    function (response) {
                        vm.sucess = "Added";
                        UserService
                            .findFavRecipeForUser(recipeId, userId)
                            .then(
                                function (response) {
                                    var result = response.data;
                                    if(result._id){
                                        vm.liked = true;
                                        vm.notliked = false;
                                    } else {
                                        vm.notliked= true;
                                        vm.liked = false;
                                    }
                                }
                            );
                    }
                );
        }

        function init() {
            UserService
                .findFavRecipeForUser(recipeId, userId)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result._id){
                            vm.liked = true;
                        } else {
                            vm.notliked= true;
                        }
                    }
                );
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
                            IngredientService
                                .findIngredientsForRecipe(recipeId)
                                .then(
                                    function (response) {
                                        vm.ingredients = response.data;
                                        UserService
                                            .findUserById(userId)
                                            .then(
                                              function (response) {
                                                  vm.user = response.data;
                                              }
                                            );
                                    }
                                );
                        }
                    );
            }

        }
        init(); 
    }
})();