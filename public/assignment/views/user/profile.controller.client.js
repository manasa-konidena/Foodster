(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService){
        var vm = this;

        //vm.updateUser = updateUser;


        function init(){
        var id = $routeParams.uid;
        vm.user = UserService.findUserById(id);
        }
        init();


        function updateUser(newUser){

            UserService.updateUser(id, newUser);
           

        }
    }
})();