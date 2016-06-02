(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService)

    
    function WebsiteService($http) {

        var api = {
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite,
            updateWebsite: updateWebsite
        };
        return api;
        
        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        
        function createWebsite(userId, website) {
            var url = "/api/user/"+ userId +"/website";
            var newWebsite = {
                // _id: (new Date()).getTime()+"",
                name: website.name,
                description: website.description,
                developerId: userId
            };
            return $http.post(url, newWebsite);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+ websiteId;
            return $http.get(url);
        }
        
        function findWebsitesByUser(userId) {
            var url = "/api/user/"+ userId + "/website";
            return $http.get(url);
        }
    }
})();