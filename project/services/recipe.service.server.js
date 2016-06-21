module.exports = function(app, models) {

    var recipeModel = models.recipeModel;

    // app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    // app.get("/api/page/:pageId", findPageById);
    // app.delete("/api/page/:pageId", deletePage);
    app.post("/api/user/:userId/recipe", createRecipe);
    // app.put("/api/page/:pageId", updatePage);
    //
    // function findAllPagesForWebsite(req, res) {
    //     var wid = req.params.websiteId;
    //
    //     pageModel
    //         .findAllPagesForWebsite(wid)
    //         .then(
    //             function (pages) {
    //                 res.json(pages);
    //             },
    //             function (error) {
    //                 res.sendStatus(404).send(error);
    //             }
    //         );
    // }
    //
    //     function findPageById(req, res) {
    //         var pid = req.params.pageId;
    //
    //         pageModel
    //             .findPageById(pid)
    //             .then(
    //                 function (page) {
    //                     res.json(page);
    //                 },
    //                 function (error) {
    //                     res.sendStatus(404).send(error);
    //                 }
    //             );
    //     }
    //
    //     function updatePage(req, res) {
    //         var pid = req.params.pageId;
    //         var page = req.body;
    //
    //         pageModel
    //             .updatePage(pid, page)
    //             .then(
    //                 function (stats) {
    //                     res.sendStatus(200);
    //                 },
    //                 function (error) {
    //                     res.sendStatus(404).send(error);
    //                 }
    //             );
    //     }
    //
    //     function deletePage(req, res) {
    //         var pid = req.params.pageId;
    //
    //         pageModel
    //             .deletePage(pid)
    //             .then(
    //                 function (stats) {
    //                     res.sendStatus(200);
    //                 },
    //                 function (error) {
    //                     res.sendStatus(404).send(error);
    //                 }
    //             );
    //     }
    //
        function createRecipe(req, res) {
            var uid = req.params.userId;
            var newRecipe = req.body;

            recipeModel
                .createRecipe(uid, newRecipe)
                .then(
                    function (recipe) {
                        res.json(recipe);
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
        }
};