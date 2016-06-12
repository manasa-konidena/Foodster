(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);


    function WidgetService($http) {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidgets: reorderWidgets,
            // findNumberOfWidgets: findNumberOfWidgets
        };
        return api;

        // function findNumberOfWidgets(pageId) {
        //     var url = "/api/page/"+pageId+"/widgetCount";
        //     return $http.get(url);
        // }

        function reorderWidgets(start, end, pageId) {
            var url = "/api/page/" +pageId +"/widget?start="+start+"&end="+end;
            return $http.put(url);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }
        
        function createWidget(pageId, newWidget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, newWidget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

    }
})();