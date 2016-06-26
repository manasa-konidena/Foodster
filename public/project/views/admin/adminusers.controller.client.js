(function () {
    angular
        .module("FoodsterApp")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController(UserService, $rootScope, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.createEndUser = createEndUser;
        vm.createAdmin = createAdmin;

        function createEndUser(username, password) {
            var newUser = {
                username: username,
                password: password,
                type: "ENDUSER"
            };

            UserService
                .createUser(newUser)
                .then(
                    function (response) {
                        vm.createsuccess = "Created EndUser Successfully";
                        vm.warning = null;
                        vm.enduser_username = null;
                        vm.enduser_password = null;
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                }
                            );
                    }
                )
        }

        function createAdmin(username, password) {
            var newUser = {
                username: username,
                password: password,
                type: "ADMIN"
            };

            UserService
                .createUser(newUser)
                .then(
                    function (response) {
                        vm.createsuccess = "Created Admin Successfully";
                        vm.admin_username = null;
                        vm.admin_password = null;
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                }
                            );
                    }
                )
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(
                    function (response) {
                        vm.warning = "Deleted Successfully!";
                        vm.createsuccess = null;
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                }
                            );
                    }
                )
        }

        function updateUser(userId, user) {
            UserService
                .updateUser(userId, user)
                .then(
                    function (response) {
                        vm.success = "Updated Successfully!";
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                }
                            );
                    }
                );
        }

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        vm.users = response.data;
                    }
                );
        }
        init();

    }
})();