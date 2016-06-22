(function () {
    angular
        .module("FoodsterApp")
        .controller("WelcomePageController", WelcomePageController);

    function WelcomePageController(YummlyService, $location, UserService, $rootScope) {
        var vm = this;
        vm.searchRecipes = searchRecipes;
        vm.logout = logout;

        var id = $rootScope.currentUser._id;

        function init(){
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    console.log(id);
                    console.log(vm.user);

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
    }
})();