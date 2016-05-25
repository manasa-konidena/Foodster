//IIFE practive
(function () {
    //no empty array means that we are reading the application
    angular
        .module("WebAppMaker")
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html"
            })

    }
})();