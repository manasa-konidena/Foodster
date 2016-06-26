(function () {
    angular
        .module("FoodsterApp")
        .controller("AdminController", AdminController);

    function AdminController(RecipeService, UserService) {
        var vm = this;

        function init() {
            RecipeService
                .findAllRecipes()
                .then(
                    function (response) {
                        vm.recipeCount = response.data.length;
                    }
                );

            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        vm.userCount = response.data.length;
                    }
                );
        }
        init();

    }
})();