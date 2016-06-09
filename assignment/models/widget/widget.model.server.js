
module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;

    function createWidget(pageId, newWidget) {
        newWidget._page = pageId;
        console.log(newWidget);
        return Widget.create(newWidget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return Widget
            .update({_id: widgetId},{
                $set: widget
            });
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
};