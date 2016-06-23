(function(){
    angular
        .module("FoodsterApp")
        .factory("IngredientService", IngredientService)

    
    function IngredientService($http) {

        var api = {
            findIngredientsForRecipe: findIngredientsForRecipe,
            findIngredientById: findIngredientById,
            createIngredient: createIngredient,
            deleteIngredient: deleteIngredient,
            updateIngredient: updateIngredient
        };
        return api;
        
        function updateIngredient(ingredientId, ingredient) {
            var url = "/api/ingredient/" + ingredientId;
            return $http.put(url, ingredient);
        }

        function deleteIngredient(ingredientId) {
            var url = "/api/ingredient/" + ingredientId;
            return $http.delete(url);
        }

        
        function createIngredient(recipeId, ingredient) {
            ingredient._recipe = recipeId;
            var url = "/api/recipe/"+ recipeId +"/ingredient";
            return $http.post(url, ingredient);
        }

        function findIngredientById(ingredientId) {
            var url = "/api/ingredient/"+ ingredientId;
            return $http.get(url);
        }
        
        function findIngredientsForRecipe(recipeId) {
            var url = "/api/recipe/"+ recipeId + "/ingredient";
            return $http.get(url);
        }
    }
})();