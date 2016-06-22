(function(){
    angular
        .module("FoodsterApp")
        .factory("RecipeService", RecipeService)

    
    function RecipeService($http) {

        var api = {
            findRecipesByUser: findRecipesByUser,
            findRecipeById: findRecipeById,
            createRecipe: createRecipe,
            deleteRecipe: deleteRecipe,
            updateRecipe: updateRecipe
        };
        return api;
        
        function updateRecipe(recipeId, recipe) {
            var url = "/api/recipe/" + recipeId;
            return $http.put(url, recipe);
        }

        function deleteRecipe(recipeId) {
            var url = "/api/recipe/" + recipeId;
            return $http.delete(url);
        }

        
        function createRecipe(userId, recipe) {
            var url = "/api/user/"+ userId +"/recipe";
            var newRecipe = {
                name: recipe.name,
                _user: userId
            };

            return $http.post(url, newRecipe);
        }

        function findRecipeById(recipeId) {
            var url = "/api/recipe/"+ recipeId;
            return $http.get(url);
        }
        
        function findRecipesByUser(userId) {
            var url = "/api/user/"+ userId + "/recipe";
            return $http.get(url);
        }
    }
})();