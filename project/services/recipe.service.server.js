module.exports = function(app, models) {

    var recipeModel = models.recipeModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/user/:userId/recipe", findAllRecipesforUser);
    app.get("/api/recipe/:recipeId", findRecipeById);
    app.get("/api/recipe", findAllRecipes);
    app.delete("/api/recipe/:recipeId", deleteRecipe);
    app.post("/api/user/:userId/recipe", createRecipe);
    app.put("/api/recipe/:recipeId", updateRecipe);
    app.put("/api/recipe/:recipeId/flag", flagAsSpam);
    app.put("/api/recipe/:recipeId/unflag", setFlaggedFalse);
    app.post ("/api/project/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {

        var recipeId      = req.body.recipeId;
        console.log(recipeId);
        var userId      = req.body.userId;
        var myFile        = req.file;

        if(myFile == null){
            res.redirect("/project/#/createrecipe/"+ recipeId);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var recipe = {imageurl: "/uploads/"+ filename };

        console.log(recipeId);
        recipeModel
            .updateRecipe(recipeId, recipe)
            .then(
                function (stats) {
                    res.redirect("/project/#/createrecipe/"+ recipeId);
                },
                function (error) {
                    res.sendStatus(404).send(err);
                }
            );
    }
    
    function findAllRecipes(req, res) {
        recipeModel
            .findAllRecipes()
            .then(
              function (recipes) {
                  res.json(recipes);
              }  
            );
    }

    function flagAsSpam(req, res) {
        var recipeId = req.params.recipeId;

        recipeModel
            .findRecipeById(recipeId)
            .then(
                function (recipe) {
                    var newCount = recipe.flaggedCount + 1;
                    var newRecipe = {
                        flagged: "True",
                        flaggedCount: newCount
                    };

                    recipeModel
                        .updateRecipe(recipeId, newRecipe)
                        .then(
                            function (stats) {
                                res.sendStatus(200);
                            }
                        );
                }
            )
    }

    function setFlaggedFalse(req, res) {
        var recipeId = req.params.recipeId;

        recipeModel
            .findRecipeById(recipeId)
            .then(
                function (recipe) {
                    var newCount = 0;
                    var newRecipe = {
                        flagged: "False",
                        flaggedCount: newCount
                    };

                    recipeModel
                        .updateRecipe(recipeId, newRecipe)
                        .then(
                            function (stats) {
                                res.sendStatus(200);
                            }
                        );
                }
            )
    }




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

        function deleteRecipe(req, res) {
            var recipeId = req.params.recipeId;

            recipeModel
                .deleteRecipe(recipeId)
                .then(
                    function (stats) {
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

        function createRecipe(req, res) {
            var uid = req.params.userId;
            var newRecipe = req.body;
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