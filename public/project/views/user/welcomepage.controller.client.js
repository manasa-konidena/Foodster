(function () {
    angular
        .module("FoodsterApp")
        .controller("WelcomePageController", WelcomePageController);

    function WelcomePageController(RecipeService, $location, UserService, $rootScope) {
        var vm = this;
        vm.searchRecipes = searchRecipes;
        vm.logout = logout;
        vm.createRecipe = createRecipe;

        var id = $rootScope.currentUser._id;
        vm.userId = id;
        
        if($rootScope.currentUser.type === "ENDUSER"){
            vm.enduser = "True";
        } else {
            vm.admin = "True";
        }

        vm.type = $rootScope.currentUser.type;

        function init(){
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    
                })
        }
        init();

        function searchRecipes(searchText) {
            $location.url("/searchresults/"+ searchText);
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }

        function createRecipe() {
            var recipe = {

            };
            RecipeService
                .createRecipe(id, recipe)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result) {
                            $location.url("/createrecipe/"+ result._id);
                        } else{
                            vm.error = "Oh SNAP! Not able to create a recipe";
                        }
                    }
                );
        }
    }
})();