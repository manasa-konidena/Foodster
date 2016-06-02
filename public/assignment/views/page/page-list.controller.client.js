(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
           PageService
               .findPagesByWebsiteId(vm.websiteId)
               .then(function (response) {
                   vm.pages = response.data;
               });
        }
        init();
    }
})();