(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)
    
    function WebsiteEditController($routeParams, WidgetService, $location) {
        var vm = this;

        // var widgetId = $routeParams.wgid;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.widgetId = $routeParams.wgid;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function deleteWidget(widgetId) {
            var result = WidgetService.deleteWidget(widgetId);

            if(result){
                $location.url("/user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else{
                vm.error = "Error";
            }
        }

        function updateWidget(widget) {
            
            var result = WidgetService.updateWidget(vm.widgetId, widget);

            if(result){
                $location.url("/user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else{
                vm.error = "Error";
            }
        }
       
    }
})();