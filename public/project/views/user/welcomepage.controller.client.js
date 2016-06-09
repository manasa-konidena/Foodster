(function () {
    angular
        .module("FoodsterApp")
        .controller("WelcomePageController", WelcomePageController)

    function WelcomePageController(YummlyService) {
        var vm = this;
        vm.searchRecipes = searchRecipes;

        function searchRecipes(searchText) {
            YummlyService
                .searchRecipes(searchText)
                .then(function (response) {
                    console.log(response.data.matches);
                    console.log(response.data.matches[0].smallImageUrls[0]);
                    vm.recipes = response.data.matches;
                    // data = response.data.replace("jsonFlickrApi(","");
                    // data = data.substring(0,data.length - 1);
                    // data = JSON.parse(data);
                    // vm.photos = data.photos;
                });
        }
    }
})();