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
        vm.createHtmlWidget = createHtmlWidget;
        vm.createTextWidget = createTextWidget;

        function createTextWidget(pageId) {
            var newWidget = {
                type: "TEXT"
                // pageId: pageId
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

        function createHtmlWidget(pageId) {
            var newWidget = {
                type: "HTML"
                // pageId: pageId
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

        function createHeaderWidget(pageId) {
            var newWidget = {
                type: "HEADER"
                // pageId: pageId
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
                // _id: (new Date()).getTime()+"",
                type: "IMAGE",
                // pageId: pageId
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
                // _id: (new Date()).getTime() + "",
                type: "YOUTUBE",
                // pageId: pageId
            };

            // var type = "YOUTUBE";

            WidgetService
                .createWidget(pageId, newWidget)
                .then(function (response) {
                    var result = response.data;
                    if (result._id) {
                        console.log(result._id);
                        $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + result._id);
                    } else {
                        vm.error = "Oh SNAP! Couldn't create widget";
                    }
                });
        }
    }
})();