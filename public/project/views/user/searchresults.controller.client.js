(function () {
    angular
        .module("FoodsterApp")
        .controller("SearchController", SearchController);

    function SearchController(YummlyService, UserService, $rootScope, $routeParams, $location, $window) {
        var vm = this;
        vm.searchRecipes = searchRecipes;
        vm.logout = logout;
        vm.seeDetails = seeDetails;
        
        var searchText = $routeParams.searchtext;

        function seeDetails(recipeId) {
            $rootScope.previousUrl = "/searchresults/" +searchText;
            $location.url("/recipe/"+ recipeId);

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
        
        function init() {
            YummlyService
                .searchRecipes(searchText)
                .then(function (response) {
                    vm.recipes = response.data.matches;
                });

            if($rootScope.currentUser){
                vm.loggedIn = "True";
            } else {
                vm.notLoggedIn = "True";
            }
        }
        init();


        function searchRecipes(searchText) {
           $location.url("/searchresults/"+ searchText);
        }
    }
})();