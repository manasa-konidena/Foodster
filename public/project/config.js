(function () {
    angular
        .module("FoodsterApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.client.html"
            })
            .when("/login", {
                templateUrl: "views/user/prologin.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/proregister.view.client.html"
            })
            // Changed routing for real purposes - changed it back

            .when("/profile", {
                templateUrl: "views/user/proprofile.view.client.html"
            })
            .when("/myrecipes", {
                templateUrl: "views/recipe/myrecipes.view.client.html"
            })
            .when("/myphotos", {
                templateUrl: "views/photo/myphotos.view.client.html"
            })
            .when("/followers", {
                templateUrl: "views/user/followers.view.client.html"
            })
            .when("/following", {
                templateUrl: "views/user/following.view.client.html"
            })
            .when("/favourites", {
                templateUrl: "views/recipe/favourites.view.client.html"
            })
            .when("/welcomepage", {
                templateUrl: "views/user/welcomepage.view.client.html"
            })
            .when("/cookedrecipes", {
                templateUrl: "views/recipe/cookedrecipes.view.client.html"
            })
            .when("/personalinfo", {
                templateUrl: "views/user/personalinfo.view.client.html"
            })
    }
})();