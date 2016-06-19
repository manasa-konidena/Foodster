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
            PageService
                .findPageById(pageId)
                .then(function (response) {
                    vm.page = response.data;
                    },
                    function (response) {
                        vm.error = "Page Not Found";
                    });
        }
        init();

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(function (response) {
                        var result = response.data;
                        if(result){
                            $location.url("user/"+userId+"/website/"+websiteId+"/page");
                        }else{
                            vm.error = "Oh SNAP! Couldnt delete the page";
                        }
                    }
                );
        }

        function updatePage(page){
            if(vm.myForm.$invalid == true){
                vm.error = "Page name can't be left empty";
                vm.alert = "* Required Field"
            } else {

           PageService
               .updatePage(pageId, page)
               .then(function (response) {
                   var result = response.data;
                   if(result){
                       $location.url("user/"+userId+"/website/"+websiteId+"/page");
                   }else{
                       vm.error = "Oh SNAP! Couldnt update the page";
                   }
               });
            }
        }
   }
})();