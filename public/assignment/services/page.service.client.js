(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            findPagesByWebsiteId: findPagesByWebsiteId,
            createPage: createPage,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        }
        return api;

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/"+ pageId;
            return $http.delete(url);
        }

        function createPage(newPage, websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            var brandNewPage = {
                name: newPage.name,
                title: newPage.title,
                // websiteId: websiteId
            };
            return $http.post(url, brandNewPage);
        }


        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }
    }
})();