(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService){
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.uid;

        function init(){
            vm.user = UserService.findUserById(id);
        }
        init();


        function updateUser(newUser){
            UserService.updateUser(id, newUser);
        }
    }
})();