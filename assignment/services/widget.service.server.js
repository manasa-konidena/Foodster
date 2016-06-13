module.exports = function(app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", reorderWidgets);
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
    }

    function reorderWidgets(req, res) {
        var pid = req.params.pageId;
        var start = parseInt(req.query.start);
        var stop = parseInt(req.query.end);
        // console.log([start, stop]);
        // res.sendStatus(200);

        widgetModel
            .reorderWidgets(start, stop, pid)
            .then(
                function (stats) {
                    res.sendStatus(200)
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteWidget(req, res) {
        var wgid = req.params.widgetId;
        var pageId = req.query.pageId;
        var deletedIndex = req.query.deleteIndex;

        
        widgetModel
            .updateWidgetIndex(pageId, deletedIndex)
            .then(
                function (stats) {
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
                }
            );
        
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
    }
};