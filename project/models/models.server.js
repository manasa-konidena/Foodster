
module.exports = function() {

    
    var models = {
        userModel: require("./user/user.model.server")(),
        recipeModel: require("./recipe/recipe.model.server")()
       };
    return models;
};