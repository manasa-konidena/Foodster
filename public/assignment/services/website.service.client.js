(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService)

    var websites = [
        { "_id": "123", "name": "Facebook",	"developerId": "456" },
        { "_id": "234", "name": "Tweeter", 	"developerId": "456" },
        { "_id": "456", "name": "Gizmodo", 	"developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",	"developerId": "123" },
        { "_id": "789", "name": "Chess",   	"developerId": "234" }
    ];

    function WebsiteService() {

        var api = {
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite,
            updateWebsite: updateWebsite
        };
        return api;
        
        function updateWebsite(websiteId, website) {
            for(var i in websites){
                if(websiteId === websites[i]._id){
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for(var i in websites){
                if(websiteId === websites[i]._id){
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        
        function createWebsite(userId, website) {
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: website.name,
                description: website.description,
                developerId: userId
            };

            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsiteById(websiteId) {
            for(var i in websites){
                if(websiteId === websites[i]._id){
                    return websites[i];
                }
            }return null;
        }
        
        function findWebsitesByUser(userId) {
            var resultSet = [];
          for(var i in websites){
              if(userId === websites[i].developerId){
                resultSet.push(websites[i]);
              }
          }
            return resultSet;
        }

    }

})();