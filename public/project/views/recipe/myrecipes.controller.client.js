(function () {
    angular
        .module("FoodsterApp")
        .controller("RecipeListController", RecipeListController);

    function RecipeListController(RecipeService, $routeParams, $rootScope) {
        var vm = this;
        var userId = $rootScope.currentUser._id;

        function init() {
            RecipeService
                .findRecipesByUser(userId)
                .then(
                    function (response) {
                        vm.recipes = response.data;
                    }
                );
        }
        init(); 
    }
})();