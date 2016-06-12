(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);
    
    function wamSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var myScope = scope;
            var startIndex = -1;
            var stopIndex = -1;
            $(element)
                .find(".container")
                .sortable({
                    axis: 'y',
                    handle: '.sort-handle',
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        stopIndex = ui.item.index();
                        console.log([startIndex, stopIndex]);
                        console.log(myScope);
                        // myScope.data.reorderWidgets({start: startIndex , stop: stopIndex})
                        myScope.data.reorderWidgets(startIndex, stopIndex);
                    }
                });
        }
        return {
            templateUrl: "views/widget/wam-sortable.view.client.html",
            scope: {
                data: "=",
                // callback: "&",
                // userId: "="
                // websiteId: "=",
                // pageId: "="
                // directivemodel: "="
            },
            link: linker
        }
    }
})();