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
            addToFavs: addToFavs
        };
        return api;
        
        function addToFavs(userId, fav) {
            var url = "/api/user/" + userId + "/fav";
            return $http.put(url, fav);
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
