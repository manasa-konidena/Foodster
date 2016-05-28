(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);
    
    function WebsiteEditController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;

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