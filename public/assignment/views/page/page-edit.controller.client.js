(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($location, $routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        // find out why it doesn't when we pass no arguments from view
        // and use the var websiteId
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;

        // Event Handlers
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init(){
            vm.page = PageService.findPageById(pageId);
        }
        init();

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);

            if(result){
                $location.url("user/"+userId+"/website/"+websiteId+"/page");
            }else{
                vm.error = "Oh SNAP! Couldnt delete the page";
            }
        }

        function updatePage(page){
            var result = PageService.updatePage(pageId, page);

            if(result){
                $location.url("user/"+userId+"/website/"+websiteId+"/page");
            }else{
                vm.error = "Oh SNAP! Couldnt update the page";
            }
        }
   }
})();