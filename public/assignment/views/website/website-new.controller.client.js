(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)

    function WebsiteNewController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.createWebsite = createWebsite;

        function createWebsite(name, desc) {

           var newWebsite = WebsiteService.createWebsite(name, desc, vm.userId);

           if(newWebsite) {
            $location.url("/user/"+vm.userId+"/website");
           } else{
               vm.error = "Oh SNAP! Not able to create a website";
           }


        }


    }
})();