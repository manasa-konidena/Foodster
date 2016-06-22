module.exports = function(app, models) {

    var recipeModel = models.recipeModel;

    app.get("/api/user/:userId/recipe", findAllRecipesforUser);
    app.get("/api/recipe/:recipeId", findRecipeById);
    // app.delete("/api/page/:pageId", deletePage);
    app.post("/api/user/:userId/recipe", createRecipe);
    app.put("/api/recipe/:recipeId", updateRecipe);

    function findAllRecipesforUser(req, res) {
        var userId = req.params.userId;

        recipeModel
            .findAllRecipesforUser(userId)
            .then(
                function (recipes) {
                    res.json(recipes);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

        function findRecipeById(req, res) {
            var recipeId = req.params.recipeId;

            recipeModel
                .findRecipeById(recipeId)
                .then(
                    function (recipe) {
                        res.json(recipe);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

        function updateRecipe(req, res) {
            var recipeId = req.params.recipeId;
            var recipe = req.body;

            recipeModel
                .updateRecipe(recipeId, recipe)
                .then(
                    function (stats) {
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

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
            console.log(newRecipe);

            recipeModel
                .createRecipe(newRecipe)
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