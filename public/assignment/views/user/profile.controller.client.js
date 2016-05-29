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
           var result = UserService.updateUser(id, newUser);
            if(result){
                vm.error = "Successfully Updated!";
            } else {
                vm.error = "Something went wrong. Couldn't update your profile"
            }
        }
    }
})();