(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.createPage = createPage;

        function createPage(newPage) {

            var brandNewPage = PageService.createPage(newPage, vm.websiteId);

            console.log(brandNewPage);

            if(brandNewPage) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else{
                vm.error = "Oh SNAP! Not able to create a page";
            }
        }
    }
})();