(function () {
    angular
        .module("FoodsterApp")
        .factory("YummlyService", YummlyService);

    var appId = "01053330";
    var appKey = "bd4e0ab74249bc1416f80431ea060085";
    var urlBase = "https://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&q=your_search_parameters";
    var getUrlBase = "https://api.yummly.com/v1/api/recipe/recipe_id?_app_id=app-id&_app_key=app-key";

    function YummlyService($http) {
        var api = {
            searchRecipes: searchRecipes,
            getFullRecipe: getFullRecipe
        };
        return api;

        function getFullRecipe(id) {
            var url = getUrlBase
                .replace("app-id", appId)
                .replace("app-key", appKey)
                .replace("recipe_id", id);

            return $http.get(url);
        }
        
        function searchRecipes(searchTerm) {
            var searchYum = searchTerm
                .replace(" ", "+");
            var url = urlBase
                        .replace("app-id", appId)
                        .replace("app-key", appKey)
                        .replace("your_search_parameters", searchTerm);
            return $http.get(url);
        }
    }
})();