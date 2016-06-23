(function(){
    angular
        .module("FoodsterApp")
        .controller("OtherUserController", OtherUserController);

    function OtherUserController(UserService, $routeParams, RecipeService){
        var vm = this;

        var userId = $routeParams.userId;

        
        function init(){
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });

            RecipeService
                .findRecipesByUser(userId)
                .then(function (response) {
                    vm.createdRecipes = response.data;
                    }

                );
        }
        init();


    }
})();