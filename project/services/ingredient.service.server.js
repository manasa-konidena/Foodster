module.exports = function(app, models) {

    var ingredientModel = models.ingredientModel;

    app.get("/api/recipe/:recipeId/ingredient", findAllIngredientsforRecipe);
    app.get("/api/ingredient/:ingredientId", findIngredientById);
    app.delete("/api/ingredient/:ingredientId", deleteIngredient);
    app.post("/api/recipe/:recipeId/ingredient", createIngredient);
    app.put("/api/ingredient/:ingredientId", updateIngredient);

    function findAllIngredientsforRecipe(req, res) {
        var recipeId = req.params.recipeId;

        ingredientModel
            .findAllIngredientsforRecipe(recipeId)
            .then(
                function (ings) {
                    res.json(ings);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

        function findIngredientById(req, res) {
            var ingredientId = req.params.ingredientId;

            ingredientModel
                .findIngredientById(ingredientId)
                .then(
                    function (ing) {
                        res.json(ing);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

        function updateIngredient(req, res) {
            var ingredientId = req.params.ingredientId;
            var ingredient = req.body;

            ingredientModel
                .updateIngredient(ingredientId, ingredient)
                .then(
                    function (stats) {
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

        function deleteIngredient(req, res) {
            var ingredientId = req.params.ingredientId;

            ingredientModel
                .deleteIngredient(ingredientId)
                .then(
                    function (stats) {
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

        function createIngredient(req, res) {
            var recipeId = req.params.recipeId;
            var newIng = req.body;

            ingredientModel
                .createIngredient(newIng)
                .then(
                    function (ingredient) {
                        res.json(ingredient);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }
};