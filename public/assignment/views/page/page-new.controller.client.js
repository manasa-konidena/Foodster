(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        // Event Handler
        vm.createPage = createPage;

        function createPage(newPage) {
           PageService
                .createPage(newPage, vm.websiteId)
                .then(function (response) {
                    var brandNewPage = response.data;
                    if(brandNewPage) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    } else{
                        vm.error = "Oh SNAP! Not able to create a page";
                    }
                });
        }
    }
})();