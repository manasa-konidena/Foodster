module.exports = function(app, models) {

    var userModel = models.userModel;


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;
        
        userModel
            .updateUser(id, user)
            .then(
                function (stats) {
                    console.log(stats);
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // for (var i in users){
        //     if(id === users[i]._id){
        //         users[i].firstName = user.firstName;
        //         users[i].lastName = user.lastName;
        //         res.json(users[i]);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function (user) {
                    console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // for (var i in users){
        //     if(users[i].username === user.username){
        //         res.send("Username already exists. Please try something else.");
        //         return;
        //     }
        // }

        // if(user.username !== user.verpass){
        //     res.send("Passwords don't match!");
        //     return;
        // }

        // user._id = (new Date()).getTime()+"";
        // users.push(user);
        // res.json(user);
    }

    function deleteUser(req,res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // for(var i in users){
        //     if(id === users[i]._id){
        //         users.splice(i,1);
        //         res.send(users);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }


    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(username, password, res);
        } else if(username){
            findUserByUsername(username, res);
        }else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send("Username doesn't exist or passwords don't match");
                });
        // for(var i in users){
        //     if(users[i].username === username){
        //         if(users[i].password === password){
        //             res.send(users[i]);
        //             return;
        //         }else {
        //             res.send("Password Incorrect. Please retry!");
        //             return;
        //         }
        //     }
        // }
        // res.send("Username doesn't exist. Please register!");
        // return;
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        //
        // for(var i in users){
        //     if(username === users[i].username){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
        // for(var i in users){
        //         if(id === users[i]._id){
        //             res.send(users[i]);
        //             return;
        //         }
        //     }
        //     res.send({});
    }
};