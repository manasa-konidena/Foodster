(function(){
    angular
        .module("FoodsterApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            login: login,
            loggedIn: loggedIn,
            register: register,
            logout: logout,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            addToFavs: addToFavs,
            removeFromFavs: removeFromFavs,
            findFavRecipeForUser: findFavRecipeForUser,
            findAllUsers: findAllUsers,
            follow: follow,
            unfollow: unfollow,
            followedBy: followedBy,
            unfollowedBy: unfollowedBy,
            addToGrocList: addToGrocList,
            deleteItem: deleteItem
        };
        return api;

        function deleteItem(itemId, userId) {
            var url = "/api/user/"+ userId + "/grocerylist/"+ itemId;
            return $http.delete(url);
        }

        function addToGrocList(ing, userId) {
            var url = "/api/user/"+ userId + "/grocerylist";
            return $http.put(url, ing);
        }

        function findAllUsers() {
            var url = "/api/project/user";
            return $http.get(url);
        }
        
        function follow(loggedInUser, followingUser) {
            var url = "/api/user/"+loggedInUser+"/follow";
            return $http.put(url, followingUser);
        }
        
        function unfollow(loggedInUser, toBeUnfolloweduser) {
            var url = "/api/user/"+loggedInUser+"/unfollowuser/"+toBeUnfolloweduser;
            return $http.delete(url);
        }

        function followedBy(followedByUser, userId) {
            var url = "/api/user/"+userId+"/followedby";
            return $http.put(url, followedByUser);
        }

        function unfollowedBy(unfollowedByUserId, userId) {
            var url = "/api/user/"+userId+"/unfollowedby/"+unfollowedByUserId;
            return $http.delete(url);
        }

        function findFavRecipeForUser(recipeId, userId) {
            var url = "/api/user/"+userId+ "/recipe/"+recipeId+ "/fav";
            return $http.get(url)
        }

        function addToFavs(userId, fav) {
            var url = "/api/user/" + userId + "/fav";
            return $http.put(url, fav);
        }

        function removeFromFavs(userId, recipeId) {
            var url = "/api/user/"+ userId + "/recipe/" + recipeId + "/fav";
            return $http.delete(url);
        }
        
        function register(newUser) {
            var brandNewUser = {
                username: newUser.username,
                password: newUser.password
            };
            var url = "/api/project/register";
            return $http.post(url, brandNewUser);
        }
        
        function loggedIn() {
            var url = "/api/project/loggedIn";
            return $http.get(url);
        }
        
        function logout() {
            var url = "/api/project/logout";
            return $http.post(url);
        }
        
        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            var url = "/api/project/login";
            return $http.post(url, user);
        }

        function createUser(newUser){
                 var brandNewUser = {
                    username: newUser.username,
                    password: newUser.password
                };
                return $http.post("/api/user", brandNewUser);
        }


        function findUserByCredentials(username, password){
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/project/user/"+ userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/api/project/user?username="+ username;
            return $http.get(url);
        }

        function updateUser(userId, newUser) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, newUser);
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }
    }
})();
