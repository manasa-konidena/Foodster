
module.exports = function() {

    
    var models = {
        proUserModel: require("./user/user.model.server")(),
        recipeModel: require("./recipe/recipe.model.server")(),
        ingredientModel: require("./ingredient/ingredient.model.server")()
       };
    return models;
};