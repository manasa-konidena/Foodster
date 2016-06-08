module.exports = function(app, models) {

    var pageModel = models.pageModel;
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];


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
                    console.log(pages);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // var resultSet = [];
        // for(var i in pages){
        //     if(wid === pages[i].websiteId){
        //         resultSet.push(pages[i]);
        //     }
        // }
        // res.send(resultSet);
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
        // for(var i in pages){
        //     if(pid === pages[i]._id){
        //         res.send(pages[i]);
        //         return;
        //     }
        // }
        // res.send(400);
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
        // for(var i in pages){
        //     if(pid === pages[i]._id){
        //         pages[i].name = page.name;
        //         pages[i].title= page.title;
        //         res.send(pages[i]);
        //         return;
        //     }
        // }
        // res.send(400);
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
        // for(var i in pages){
        //     if(pid === pages[i]._id){
        //         pages.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
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
        // newPage._id = (new Date()).getTime()+"";
        // pages.push(newPage);
        // res.sendStatus(200);
    }
};