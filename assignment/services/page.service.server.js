module.exports = function(app) {

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
        var resultSet = [];
        for(var i in pages){
            if(wid === pages[i].websiteId){
                resultSet.push(pages[i]);
            }
        }
        res.send(resultSet);
    }

    function findPageById(req, res) {
        var pid = req.params.pageId;
        for(var i in pages){
            if(pid === pages[i]._id){
                res.send(pages[i]);
                return;
            }
        }
        res.send(400);
    }

    function updatePage(req, res) {
        var pid = req.params.pageId;
        var page = req.body;
        for(var i in pages){
            if(pid === pages[i]._id){
                pages[i].name = page.name;
                pages[i].title= page.title;
                res.send(pages[i]);
                return;
            }
        }
        res.send(400);
    }

    function deletePage(req, res) {
        var pid = req.params.pageId;
        for(var i in pages){
            if(pid === pages[i]._id){
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function createPage(req, res) {
        var wid = req.params.websiteId;
        var newPage = req.body;
        newPage._id = (new Date()).getTime()+"";
        pages.push(newPage);
        res.send(200);
    }
};