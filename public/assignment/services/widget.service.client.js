(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService)

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Google has been <a href="http://gizmodo.com/google-is-reportedly-selling-crazy-robotics-skunkworks-1765507672">talking about selling</a> the Waltham-based Boston Dynamics, for a couple of months now, with companies such as Toyota Research Institute and Amazon.com named as interested parties. Around that time, TRI, which seeks to create a car that is incapable of crashing, <a href="http://corporatenews.pressroom.toyota.com/releases/tri-expands-autonomous-vehicle-team.htm" rel="noopener" target="_blank">announced a deal</a> to acquire Jaybridge, a 16-member software engineering company, in order to add more expertise to creating “autonomous vehicle products.”</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    
    function WidgetService() {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId
            
        };
        return api;


        function findWidgetsByPageId(pageId) {
            var resultSet = [];

            for(var i in widgets){
                if(pageId === widgets[i].pageId){
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }
        
    }
})();