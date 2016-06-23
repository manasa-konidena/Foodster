(function () {
    angular
        .module("FoodsterApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.client.html",
                
            })
            .when("/login", {
                templateUrl: "views/user/prologin.view.client.html",
                controller: "ProLoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/proregister.view.client.html",
                controller: "ProRegisterController",
                controllerAs: "model"
            })
            // Changed routing for real purposes - changed it back


            .when("/searchresults/:searchtext", {
                templateUrl: "views/user/searchresults.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }

            })
            .when("/myrecipes", {
                templateUrl: "views/recipe/myrecipes.view.client.html",
                controller: "RecipeListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            
            .when("/followers", {
                templateUrl: "views/user/followers.view.client.html"
            })
            .when("/following", {
                templateUrl: "views/user/following.view.client.html"
            })
            .when("/favourites", {
                templateUrl: "views/recipe/favourites.view.client.html"
            })
            .when("/welcomepage", {
                templateUrl: "views/user/welcomepage.view.client.html",
                controller: "WelcomePageController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/addingredients/:recipeId", {
                templateUrl: "views/ingredient/addingr.view.client.html",
                controller: "AddIngrController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/personalinfo", {
                templateUrl: "views/user/personalinfo.view.client.html"
            })
            .when("/createrecipe/:recipeId", {
                templateUrl: "views/recipe/createrecipe.view.client.html",
                controller: "CreateRecipeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/recipe/:recipeId", {
                templateUrl: "views/recipe/recipe.view.client.html",
                controller: "RecipeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope) {

            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }
    }
})();