
module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidgets: reorderWidgets,
        updateWidgetIndex: updateWidgetIndex
    };
    return api;

    function createWidget(pageId, newWidget) {
        newWidget._page = pageId;
        return Widget.create(newWidget);
    }

    function reorderWidgets(start, stop, pageId) {
        return Widget.find({_page: pageId}, function (err, widgets) {
            widgets.forEach(function (widget) {
                   if(start < stop){
                       if(widget.reorderIndex === start){
                           widget.reorderIndex = stop;
                           widget.save();
                       } else if(widget.reorderIndex > start && widget.reorderIndex <= stop){
                           widget.reorderIndex--;
                           widget.save();
                       }
                   } else {
                       if(widget.reorderIndex === start){
                           widget.reorderIndex = stop;
                           widget.save();
                       } else if(widget.reorderIndex < start && widget.reorderIndex >= stop){
                           widget.reorderIndex++;
                           widget.save();
                       }
                   }
            })
        })
    }

    function updateWidgetIndex(pageId, deletedIndex) {
        var pageId = pageId;
        var deletedIndex = deletedIndex;
        // console.log(deletedIndex);
        return Widget.find({_page: pageId}, function (err, widgets) {
            widgets.forEach(function (widget) {
                if(widget.reorderIndex > deletedIndex){
                    widget.reorderIndex--;
                    widget.save(function () {
                    });
                }
            })
        });
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget
            .update({_id: widgetId},{
                // $set: {
                //     name: widget.name,
                //     text: widget.text,
                //     size: widget.size
                // }
                $set: widget
            });
    }

    function deleteWidget(widgetId) {
        // var pageId = widgetInfo.pageId;
        // var deletedIndex = widgetInfo.reorderIndex;
        //
        // return Widget.find({pageId: pageId}, function (err, widgets) {
        //     widgets.forEach(function (widget) {
        //         if(widget.reorderIndex === deletedIndex){
        //             widgets.splice(deletedIndex, 1);
        //             widget.save();
        //         } else if(widget.reorderIndex > deletedIndex){
        //             widget.reorderIndex--;
        //             widget.save();
        //         }
        //     })
        // });
        return Widget.remove({_id: widgetId});
    }
};