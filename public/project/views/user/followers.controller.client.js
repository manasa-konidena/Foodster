(function(){
    angular
        .module("FoodsterApp")
        .controller("FollowersController", FollowersController);

    function FollowersController(UserService, $rootScope){
        var vm = this;
       var userId = $rootScope.currentUser._id;


        function init() {
            UserService
                .findUserById(userId)
                .then(
                    function (response) {
                        console.log(response.data);
                        vm.user = response.data;
                    }
                )
        }
        init();

    }
})();