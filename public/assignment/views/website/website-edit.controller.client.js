(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm =this;

        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;

        // Event Handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        
        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(
                    function (response) {
                        vm.website = response.data;
                    },

                    function (response) {
                        vm.error = "Website doesnt exist";
                    }
                );
        }
        init();
        
        function updateWebsite(websiteId, website) {
            WebsiteService
                .updateWebsite(websiteId, website)
                .then(function (response) {
                        var result = response.data;
                        if(result){
                            $location.url("user/"+vm.userId+"/website");
                        }else{
                            vm.error = "Oh SNAP! Couldnt update the website";
                        }
                      }
                    );
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function (response) {
                    var result = response.data;
                    if(result){
                        $location.url("user/"+vm.userId+"/website");
                    }else{
                        vm.error = "Oh SNAP! Couldnt delete the website";
                    }
                });
        }
    }
})();