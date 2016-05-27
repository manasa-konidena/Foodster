(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);
    
    function WebsiteEditController($routeParams, WebsiteService) {
        var vm = this;


        
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser($routeParams.uid);

        }
        init()
        
    }
})();