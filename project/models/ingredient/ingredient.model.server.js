
module.exports = function () {

    var mongoose = require("mongoose");
    var IngredientSchema = require("./ingredient.schema.server")();
    var Ingredient = mongoose.model("Ingredient", IngredientSchema);

    var api = {
        createIngredient: createIngredient,
        findIngredientById: findIngredientById,
        findAllIngredientsforRecipe: findAllIngredientsforRecipe,
        updateIngredient: updateIngredient,
        deleteIngredient: deleteIngredient,
        findAllIngredients: findAllIngredients

    };
    return api;


    function findAllIngredientsforRecipe(recipeId) {
        return Ingredient.find({_recipe: recipeId});
    }

    function findAllIngredients() {
        return Ingredient.find();
    }

    
    function createIngredient(ingredient) {
        return Ingredient.create(ingredient);
    }

    function findIngredientById(ingredientId) {
        return Ingredient.findById(ingredientId);
    }
    

    function updateIngredient(ingredientId, ingredient) {
        delete ingredient._id;
        return Ingredient
            .update({_id: ingredientId},{
                
                $set: ingredient
            });
    }

    function deleteIngredient (ingredientId){
        return Ingredient.remove({_id: ingredientId});
    }


};