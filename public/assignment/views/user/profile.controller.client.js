(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService){
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;

        var id = $routeParams.uid;

        function init(){
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                })

        }
        init();

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function () {
                        $location.url("/login");
                    },
                    function () {
                        vm.error="Unable to remove user";
                    }
                );
        }
        
        function updateUser(newUser){
           UserService
               .updateUser(id, newUser)
               .then(
                   function (response) {
                       vm.success = "Successfully Updated!";
                   },
                   function () {
                       vm.error = "Something went wrong. Couldn't update your profile";
                   }
               );
               // .then(function (response) {
               //     var result = response.data;
               //     if(result){
               //         vm.error = "Successfully Updated!";
               //     } else {
               //         vm.error = "Something went wrong. Couldn't update your profile"
               //     }
               // });
        }
    }
})();