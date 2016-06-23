(function(){
    angular
        .module("FoodsterApp")
        .controller("PersonalInfoController", PersonalInfoController);

    function PersonalInfoController($location, UserService, $rootScope){
        var vm = this;
        vm.updateUser = updateUser;
        vm.logout = logout;

        var id = $rootScope.currentUser._id;

        function logout() {
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
        }
    }
})();