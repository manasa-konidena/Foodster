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
            createPage: createPage,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        }
        return api;

        function findPageById(pageId) {
            for(var i in pages){
                if(pageId === pages[i]._id){
                    return pages[i];
                }
            }
        }

        function updatePage(pageId, page) {
            for(var i in pages){
                if(pageId === pages[i]._id){
                    pages[i].name = page.name;
                    pages[i].title= page.title;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for(var i in pages){
                if(pageId === pages[i]._id){
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

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