(function () {
    angular
        .module("FoodsterApp")
        .controller("GroceryListController", GroceryListController);

    function GroceryListController(UserService, $rootScope) {
        var vm = this;

        var userId = $rootScope.currentUser._id;
        vm.addToGrocList = addToGrocList;
        vm.deleteItem = deleteItem;
        
        function init() {
            UserService
                .findUserById(userId)
                .then(
                    function (response) {
                        vm.user = response.data;

                    }
                )
        }
        init();

        function deleteItem(itemId) {
            UserService
                .deleteItem(itemId, userId)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result){
                            vm.success = "deleted!";
                            UserService
                                .findUserById(userId)
                                .then(
                                    function (response) {
                                        vm.user = response.data;

                                    }
                                )
                        }
                    }
                );
        }

        function addToGrocList(item) {
            var toBeAdded = {
                ingredient: item
            };

            UserService
                .addToGrocList(toBeAdded, userId)
                .then(
                    function (response) {
                        var result = response.data;
                        if(result) {
                            vm.item = null;
                            UserService
                                .findUserById(userId)
                                .then(
                                    function (response) {
                                        vm.user = response.data;

                                    }
                                )
                        } else{
                            vm.error = "Oh SNAP! Couldnt Add";
                        }
                    }
                );
        }

    }
})();