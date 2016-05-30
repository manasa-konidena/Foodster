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
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
        
        function updateWebsite(websiteId, website) {
            var result = WebsiteService.updateWebsite(websiteId, website);

            if(result){
                $location.url("user/"+vm.userId+"/website");
            }else{
                vm.error = "Oh SNAP! Couldnt update the website";
            }
        }

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);

            if(result){
                $location.url("user/"+vm.userId+"/website");
            }else{
                vm.error = "Oh SNAP! Couldnt delete the website";
            }
        }
    }
})();