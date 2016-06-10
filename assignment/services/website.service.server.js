module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);
    app.put("/api/website/:websiteId", updateWebsite);

    function findAllWebsitesForUser(req, res) {
        var id = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(id)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;

        websiteModel
            .findWebsiteById(wid)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var wid = req.params.websiteId;
        var website = req.body;

        websiteModel
            .updateWebsite(wid, website)
            .then(
                function (stats) {
                    console.log(stats);
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;

        websiteModel
            .deleteWebsite(wid)
            .then(
                function (stats) {
                    console.log(stats);
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function createWebsite(req, res) {
        var uid = req.params.userId;
        var newWebsite = req.body;

        websiteModel
            .createWebsite(uid, newWebsite)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};