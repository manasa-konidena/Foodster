 module.exports = function(app, models) {

    var pageModel = models.pageModel;

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

        function findPageById(req, res) {
            var pid = req.params.pageId;

            pageModel
                .findPageById(pid)
                .then(
                    function (page) {
                        res.json(page);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

        function updatePage(req, res) {
            var pid = req.params.pageId;
            var page = req.body;

            pageModel
                .updatePage(pid, page)
                .then(
                    function (stats) {
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

        function deletePage(req, res) {
            var pid = req.params.pageId;

            pageModel
                .deletePage(pid)
                .then(
                    function (stats) {
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

        function createPage(req, res) {
            var wid = req.params.websiteId;
            var newPage = req.body;

            pageModel
                .createPage(wid, newPage)
                .then(
                    function (page) {
                        console.log(page);
                        res.json(page);
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
        }
};