(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);
    
    function WebsiteEditController($location, $routeParams, WebsiteService) {
        var vm = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        // find out why it doesn't when we pass no arguments from view
        // and use the var websiteId
        vm.websiteId = websiteId;

        // vm.userId = $routeParams.uid;
        // vm.websiteId = $routeParams.wid;

        function init(){

            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();


        vm.deleteWebsite = deleteWebsite;
        
        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);

            if(result){
                $location.url("user/"+userId+"/website");
            }else{
                vm.error = "Oh SNAP! Couldnt delete the website";
            }
        }

        vm.updateWebsite = updateWebsite;

        function updateWebsite(website){
            WebsiteService.updateWebsite(websiteId, website);
        }
    }
})();