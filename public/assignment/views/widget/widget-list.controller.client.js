(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        // Event Handlers
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidgets = reorderWidgets;
        
        function reorderWidgets(start, stop) {
            console.log("reordering widgets");
            console.log(start);
            console.log(stop);
            WidgetService
                .reorderWidgets(start, stop, vm.pageId)
                .then(
                    function (response) {
                    return "true";
                    }
                );
        }

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    var widgetList = response.data;
                    console.log(widgetList);
                    for(var w in widgetList){
                        if(widgetList[w].type === "YOUTUBE" || widgetList[w].type === "IMAGE"){
                            widgetList[w].width += "%";
                        }
                    }
                    vm.widgets = widgetList;
                    // $(".container")
                    //     .sortable({
                    //         axis: 'y',
                    //         handle: '.sort-handle'
                    //     });
                });
        }
        init();

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length -1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
        
        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }
    }

})();