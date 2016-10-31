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
        vm.addToGrocList = addToGrocList;
        vm.flagAsSpam = flagAsSpam;
        vm.logout = logout;


        function flagAsSpam(recipeId) {
            RecipeService
                .flagAsSpam(recipeId)
                .then(
                    function (response) {
                        vm.success = "Reported as Spam!";
                        vm.reported = "True";
                    }
                );
            
        }

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
                                                // to display "Remove from Favs" right after adding to favorites
                                                vm.liked = true;
                                                vm.unliked = false;
                                                return;
                                            }
                                        }
                                        // to display "Add to favs" if not already added.
                                        vm.unliked = true;
                                        vm.liked = false;
                                    }
                                }
                            );
                    }
                );
        }

        function addToFavs(recipeName, recipeId, recipeRating, imageurl) {
            var fav = {
                recipeName: recipeName,
                recipeId: recipeId,
                recipeRating: recipeRating,
                imageurl: imageurl
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
                                                // to display "Remove from Favs" right after adding to favorites
                                                vm.liked = true;
                                                vm.unliked = false;
                                                return;
                                            }
                                        }
                                        // to display "Add to favs" when not already added.
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
                    // Check if this is a user created recipe or web recipe
                    YummlyService
                        .getFullRecipe(recipeId)
                        .then(function (response) {
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

        function addToGrocList(ing) {
            var toBeAdded = null;
            if(ing.quantity){
                toBeAdded = { ingredient: ing.name + ing.quantity};
            } else {
                toBeAdded = { ingredient: ing};

            }

           UserService
                .addToGrocList(toBeAdded, userId)
                .then(
                    function (response) {
                        vm.groc = "Added to your grocery list";
                    }
                )
        }
    }
})();