
module.exports = function () {

    var mongoose = require("mongoose");
    var RecipeSchema = require("./recipe.schema.server")();
    var Recipe = mongoose.model("Recipe", RecipeSchema);

    var api = {
        createRecipe: createRecipe,
        findRecipeById: findRecipeById,
        findAllRecipesforUser: findAllRecipesforUser,
        updateRecipe: updateRecipe,
        deleteRecipe: deleteRecipe,
        findAllRecipes: findAllRecipes

    };
    return api;


    function findAllRecipesforUser(userId) {
        return Recipe.find({_user: userId});
    }

    function findAllRecipes() {
        return Recipe.find();
    }

    
    function createRecipe(recipe) {
        console.log(recipe);
        return Recipe.create(recipe);
    }

    function findRecipeById(recipeId) {
        return Recipe.findById(recipeId);
    }
    

    function updateRecipe(recipeId, recipe) {
        delete recipe._id;
        return Recipe
            .update({_id: recipeId},{
                
                $set: recipe
            });
    }

    function deleteRecipe (recipeId){
        return Recipe.remove({_id: recipeId});
    }


};