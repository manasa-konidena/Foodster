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

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    var widgetList = response.data;
                    for(var w in widgetList){
                        if(widgetList[w].type === "HEADER" || widgetList[w].type === "IMAGE"){
                            widgetList[w].width += "%";
                        }
                    }
                    vm.widgets = widgetList;
                    $(".container")
                        .sortable({
                            axis: 'y'
                        });
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