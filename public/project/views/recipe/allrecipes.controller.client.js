(function () {
    angular
        .module("FoodsterApp")
        .controller("AllRecipeController", AllRecipeController);

    function AllRecipeController(RecipeService, UserService, $rootScope, $location) {
        var vm = this;
        vm.logout = logout;

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


        
        function init() {
            RecipeService
                .findAllRecipes()
                .then(
                    function (response) {
                        console.log(response.data);
                        vm.recipes = response.data;
                    }
                );

            if($rootScope.currentUser){
                vm.loggedIn = "True";
            } else {
                vm.notLoggedIn = "True";
            }
        }
        init(); 
    }
})();