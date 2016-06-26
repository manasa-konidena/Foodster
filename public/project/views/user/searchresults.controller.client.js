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
                    // console.log(response.data.matches);
                    // console.log(response.data.matches[0].smallImageUrls[0]);
                    vm.recipes = response.data.matches;
                    // data = response.data.replace("jsonFlickrApi(","");
                    // data = data.substring(0,data.length - 1);
                    // data = JSON.parse(data);
                    // vm.photos = data.photos;
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