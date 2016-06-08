module.exports = function(app, models) {

    var widgetModel = models.widgetModel;
    
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

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var userId      = req.body.userId;
        var websiteId      = req.body.websiteId;
        var pageId      = req.body.pageId;
        var width         = req.body.width;
        var myFile        = req.file;

        if(myFile == null){
            res.redirect("/assignment/#/user/"+ userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = {url: "/uploads/"+ filename };
        
        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (stats) {
                    res.redirect("/assignment/#/user/"+ userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.sendStatus(404).send(err);
                }
            );
        // for(var i in widgets){
        //     if(widgets[i]._id === widgetId){
        //         widgets[i].url = "/uploads/"+ filename;
        //     }
        // }


    }

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // var resultSet = [];
        // for(var i in widgets){
        //     if(pid === widgets[i].pageId){
        //         resultSet.push(widgets[i]);
        //     }
        // }
        // res.send(resultSet);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.widgetId;

        widgetModel
            .findWidgetById(wgid)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // for(var i in widgets){
        //     if(wgid === widgets[i]._id){
        //         res.send(widgets[i]);
        //         return;
        //     }
        // }res.send(400);
    }

    function updateWidget(req, res) {
        var wgid = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(wgid, widget)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
        // for(var i in widgets){
        //     if(wgid === widgets[i]._id){
        //         switch (widgets[i].widgetType){
        //             case "HEADER":
        //                 widgets[i].name = widget.name;
        //                 widgets[i].text = widget.text;
        //                 widgets[i].size = widget.size;
        //                 res.send(200);
        //                 return;
        //
        //             case "YOUTUBE":
        //             case "IMAGE":
        //                 console.log("Its an image");
        //                 widgets[i].name = widget.name;
        //                 widgets[i].text = widget.text;
        //                 widgets[i].url = widget.url;
        //                 widgets[i].width = widget.width;
        //                 res.send(200);
        //                 console.log(widgets[i]);
        //                 return;
        //         }
        //
        //     }
        // }
        // res.send(400);
    }

    function deleteWidget(req, res) {
        var wgid = req.params.widgetId;

        widgetModel
            .deleteWidget(wgid)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // for(var i in widgets){
        //     if(wgid === widgets[i]._id){
        //         widgets.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function createWidget(req, res) {
        var pid = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pid, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // //widget._id = (new Date()).getTime+"";
        // widgets.push(widget);
        // res.send(widget);
    }
};