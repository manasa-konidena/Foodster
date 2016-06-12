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
            var index = -1;
            var newWidget = {type: "TEXT"};
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        var result = response.data;
                        var length = result.length;
                        index = length;

                        newWidget.reorderIndex = index;

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
                    });
        }

        function createHtmlWidget(pageId) {
            var index = -1;
            var newWidget = {type: "HTML"};
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        var result = response.data;
                        var length = result.length;
                        index = length;

                        newWidget.reorderIndex = index;


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
                    });
        }

        function createHeaderWidget(pageId) {
            // console.log("Entered to create");
            var index = -1;
            var newWidget = {type: "HEADER"};
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        var result = response.data;
                        var length = result.length;
                        index = length;

                        newWidget.reorderIndex = index;

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
                   });
        }

        function createImageWidget(pageId) {
            var index = -1;
            var newWidget = {type: "IMAGE"};
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        var result = response.data;
                        var length = result.length;
                        index = length;

                        newWidget.reorderIndex = index;

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
                    });
        }

        function createYoutubeWidget(pageId) {
            var index = -1;
            var newWidget = {type: "YOUTUBE"};
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        var result = response.data;
                        var length = result.length;
                        index = length;

                        newWidget.reorderIndex = index;

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
                    });
        }
    }
})();