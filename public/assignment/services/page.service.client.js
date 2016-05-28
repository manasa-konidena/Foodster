(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];
    


    function PageService() {
        var api = {
            findPagesByWebsiteId: findPagesByWebsiteId,
            createPage: createPage
        }
        return api;

        function createPage(newPage, websiteId) {
            var brandNewPage = {
                _id: (new Date()).getTime()+"",
                name: newPage.name,
                websiteId: websiteId
            };

            pages.push(brandNewPage);
            return brandNewPage;
        }


        function findPagesByWebsiteId(websiteId) {
            var resultSet = [];
            
            for(var i in pages){
                if(websiteId === pages[i].websiteId){
                    resultSet.push(pages[i]);        
                }
            }
            return resultSet;
        }
    }
})();