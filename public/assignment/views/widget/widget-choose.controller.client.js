(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", WidgetChooseController)

    function WidgetChooseController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        // Event Handlers
        vm.createHeaderWidget = createHeaderWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;

        function createHeaderWidget(pageId) {
            var newWidget = {
                // _id: (new Date()).getTime()+"",
                widgetType: "HEADER",
                pageId: pageId
            };
            // var type = "HEADER";

            WidgetService
                .createWidget(pageId, newWidget)
                .then(function (response) {
                    var result = response.data;
                    if (result._id) {
                        $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + result._id);
                    } else {
                        vm.error = "Oh SNAP! Couldn't create widget";
                    }
                });
        }

        function createImageWidget(pageId) {
            var newWidget = {
                //_id: (new Date()).getTime()+"",
                widgetType: "IMAGE",
                pageId: pageId
            };

            WidgetService
                .createWidget(pageId, newWidget)
                .then(function (response) {
                    var result = response.data;
                    if (result._id) {
                        $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + result._id);
                    } else {
                        vm.error = "Oh SNAP! Couldn't create widget";
                    }
                });
        }

        function createYoutubeWidget(pageId) {
            var newWidget = {
                _id: (new Date()).getTime() + "",
                widgetType: "YOUTUBE",
                pageId: pageId
            };

            // var type = "YOUTUBE";

            WidgetService
                .createWidget(pageId, newWidget)
                .then(function (response) {
                    var result = response.data;
                    if (result._id) {
                        $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + result._id);
                    } else {
                        vm.error = "Oh SNAP! Couldn't create widget";
                    }
                });
        }
    }
})();