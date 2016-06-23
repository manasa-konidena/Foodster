(function(){
    angular
        .module("FoodsterApp")
        .controller("AllUserController", AllUserController);

    function AllUserController(UserService){
        var vm = this;
        function init(){
            UserService
                .findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                });
        }
        init();


    }
})();