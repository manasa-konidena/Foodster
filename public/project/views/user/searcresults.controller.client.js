(function () {
    angular
        .module("FoodsterApp")
        .controller("SearchController", SearchController);

    function SearchController(YummlyService, $routeParams, $location) {
        var vm = this;
        vm.searchRecipes = searchRecipes;
        
        var searchText = $routeParams.searchtext;
        
        function init() {
            YummlyService
                .searchRecipes(searchText)
                .then(function (response) {
                    // console.log(response.data.matches);
                    // console.log(response.data.matches[0].smallImageUrls[0]);
                    vm.recipes = response.data.matches;
                    // data = response.data.replace("jsonFlickrApi(","");
                    // data = data.substring(0,data.length - 1);
                    // data = JSON.parse(data);
                    // vm.photos = data.photos;
                }); 
        }
        init();


        function searchRecipes(searchText) {
           $location.url("/searchresults/"+ searchText);
        }
    }
})();