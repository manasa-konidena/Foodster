module.exports = function(app) {

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
        var resultSet = [];
        for(var i in websites){
            if(id === websites[i].developerId){
                resultSet.push(websites[i]);
            }
        }
        res.send(resultSet);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        for(var i in websites){
            if(wid === websites[i]._id){
                res.send(websites[i]);
                return;
            }
        }
        res.send(400);
    }

    function updateWebsite(req, res) {
        var wid = req.params.websiteId;
        var website = req.body;
        for(var i in websites){
            if(wid === websites[i]._id){
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.send(websites[i]);
                return;
            }
        }
        res.send(400);
    }

    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        for(var i in websites){
            if(wid === websites[i]._id){
                websites.splice(i, 1);
                res.send(200);
            }
        }
        res.send(400);
    }

    function createWebsite(req, res) {
        var uid = req.params.userId;
        var newWebsite = req.body;
        newWebsite._id = (new Date()).getTime()+"";
        websites.push(newWebsite);
        res.send(200);
    }
};