(function(){
    angular
        .module("FoodsterApp")
        .controller("FollowingController", FollowingController);

    function FollowingController(UserService, $rootScope){
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