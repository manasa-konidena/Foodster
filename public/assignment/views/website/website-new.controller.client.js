(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)

    function WebsiteNewController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.createWebsite = createWebsite;

        function createWebsite(website) {
           console.log(vm.myForm);
            if(vm.myForm.$invalid == true){
                // $setSubmitted();
                vm.error = "Please enter a valid name";
                vm.alert = "* Required Field";
                
            } else {
           WebsiteService
               .createWebsite(vm.userId, website)
               .then(function (response) {
                   var result = response.data;
                   if(result) {
                       $location.url("/user/"+vm.userId+"/website");
                   } else{
                       vm.error = "Oh SNAP! Not able to create a website";
                   }
               });
            }
        }
    }
})();