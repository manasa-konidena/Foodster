(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", WidgetChooseController)

    function WidgetChooseController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.createHeaderWidget = createHeaderWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;

        function createHeaderWidget(pageId) {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: "HEADER",
                pageId: pageId
            };
            // var type = "HEADER";

            var result = WidgetService.createWidget(pageId, newWidget);

            if(result){
                $location.url("user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
            } else {
                vm.error = "Oh SNAP! Couldn't create widget";
            }
        }

        function createImageWidget(pageId) {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: "IMAGE",
                pageId: pageId
            };

            // var type = "IMAGE";
            var result = WidgetService.createWidget(pageId, newWidget);

            if(result){
                $location.url("user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
            } else {
                vm.error = "Oh SNAP! Couldn't create widget";
            }
        }

        function createYoutubeWidget(pageId) {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: "YOUTUBE",
                pageId: pageId
            };

            // var type = "YOUTUBE";

            var result = WidgetService.createWidget(pageId, newWidget);

            if(result){
                $location.url("user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
            } else {
                vm.error = "Oh SNAP! Couldn't create widget";
            }
        }


    }
})();