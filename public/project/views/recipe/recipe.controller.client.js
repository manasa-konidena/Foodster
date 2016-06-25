(function () {
    angular
        .module("FoodsterApp")
        .controller("RecipeController", RecipeController);

    function RecipeController(YummlyService, $location, $window, $rootScope, $routeParams, RecipeService, IngredientService, UserService) {
        var vm = this;
        var recipeId = $routeParams.recipeId;

        
         var userId = $rootScope.currentUser._id;


        vm.addToFavs = addToFavs;
        vm.removeFromFavs = removeFromFavs;
        vm.goBack = goBack;
        

        function goBack() {
            $window.history.back();
        }


        function removeFromFavs() {
            UserService
                .removeFromFavs(userId, recipeId)
                .then(
                    function (response) {
                        vm.success = "Removed";
                        UserService
                            .findUserById(userId)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if(user) {
                                        for (var i in user.favrecipes) {
                                            if (user.favrecipes[i].recipeId === recipeId) {
                                                vm.liked = true;
                                                vm.unliked = false;
                                                return;
                                            }
                                        }
                                        vm.unliked = true;
                                        vm.liked = false;
                                    }
                                }
                            );
                    }
                );
        }

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
                            .findUserById(userId)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if(user) {
                                        for (var i in user.favrecipes) {
                                            if (user.favrecipes[i].recipeId === recipeId) {
                                                vm.liked = true;
                                                vm.unliked = false;
                                                return;
                                            }
                                        }
                                        vm.unliked = true;
                                        vm.liked = false;
                                    }
                                }
                            );
                    }
                );
        }

        function init() {
                UserService
                    .findUserById(userId)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user) {
                                for (var i in user.favrecipes) {
                                    if (user.favrecipes[i].recipeId === recipeId) {
                                            vm.liked = true;
                                            vm.unliked = false;
                                            return;
                                    }
                                }
                                vm.unliked = true;
                                vm.liked = false;
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