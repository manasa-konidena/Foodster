
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
        reorderWidgets: reorderWidgets
    };
    return api;

    function createWidget(pageId, newWidget) {
        newWidget._page = pageId;
        console.log(newWidget);
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



        // var widgetsForPage= findAllWidgetsForPage(pageId);
        // console.log(widgetsForPage);
        // return "OK";
        // widgetsForPage.forEach(function (widget) {
        //    if(start < stop){
        //        if(widget.reorderIndex === start){
        //            widget.reorderIndex = stop;
        //            widget.save();
        //        } else if(widget.reorderIndex > start && widget.reorderIndex <= stop){
        //            widget.reorderIndex--;
        //            widget.save();
        //        }
        //    } else {
        //        if(widget.reorderIndex === start){
        //            widget.reorderIndex = stop;
        //            widget.save();
        //        } else if(widget.reorderIndex < start && widget.reorderIndex >= stop){
        //            widget.reorderIndex++;
        //            widget.save();
        //        }
        //    }
        // });
        // return "OK";
    // }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
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
        return Widget.remove({_id: widgetId});
    }
};