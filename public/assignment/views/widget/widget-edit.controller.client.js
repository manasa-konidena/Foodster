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

        // Event Handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                });
        }
        init();

        function deleteWidget(widgetId) {
             WidgetService
                .deleteWidget(widgetId, vm.pageId, vm.widget.reorderIndex)
                .then(function (response) {
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    } else{
                        vm.error = "Error";
                    }
                });
        }

        function updateWidget(widget) {
            
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function (response) {
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    } else{
                        vm.error = "Error";
                    }
                });
        }
    }
})();