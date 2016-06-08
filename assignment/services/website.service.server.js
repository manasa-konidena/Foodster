module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    var websites = [
        { "_id": "123", "name": "Facebook",	"developerId": "456" },
        { "_id": "234", "name": "Tweeter", 	"developerId": "456" },
        { "_id": "456", "name": "Gizmodo", 	"developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",	"developerId": "123" },
        { "_id": "789", "name": "Chess",   	"developerId": "234" }
    ];

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

        // var resultSet = [];
        // for(var i in websites){
        //     if(id === websites[i].developerId){
        //         resultSet.push(websites[i]);
        //     }
        // }
        // res.send(resultSet);
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

        // for(var i in websites){
        //     if(wid === websites[i]._id){
        //         res.send(websites[i]);
        //         return;
        //     }
        // }
        // res.send(400);
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

        // for(var i in websites){
        //     if(wid === websites[i]._id){
        //         websites[i].name = website.name;
        //         websites[i].description = website.description;
        //         res.send(websites[i]);
        //         return;
        //     }
        // }
        // res.send(400);
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
        // for(var i in websites){
        //     if(wid === websites[i]._id){
        //         websites.splice(i, 1);
        //         res.send(200);
        //     }
        // }
        // res.send(400);
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
        // newWebsite._id = (new Date()).getTime()+"";
        // websites.push(newWebsite);
        // res.send(200);
    }
};