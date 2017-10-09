var ProjectPassport = require('passport');
var ProLocalStrategy = require('passport-local').Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var bcrypt = require("bcrypt-nodejs");

// var googleConfig = {
//     clientID     : process.env.GOOGLE_CLIENT_ID,
//     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL  : process.env.GOOGLE_CALLBACK_URL
// };

var googleConfig = {
    clientID     : "701231942022-rhrqgs9mlesk8c2s8g9uhcjo3ra114d6.apps.googleusercontent.com",
    clientSecret : "Fox0klWdFAqyILkHDbZat6UC",
    callbackURL  : "http://localhost:3000/auth/google/callback"
};

module.exports = function(app, promodels) {

    var prouserModel = promodels.proUserModel;
 
    app.get("/api/project/user", getUsers);

    app.post("/api/project/logout", logout);
    app.get('/auth/google', ProjectPassport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/api/project/loggedIn", prologgedIn);
    app.post("/api/project/register", register);
    app.post("/api/project/login", ProjectPassport.authenticate('foodap'), prologin);//created afer introduction of sessions/passport
    app.get("/api/project/user/:userId", findUserById);
    app.delete("/api/project/user/:userId", deleteUser);
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:userId", updateUser);
    app.put("/api/user/:userId/fav", addToFavs);
    app.delete("/api/user/:userId/recipe/:recipeId/fav", removeFromFavs);
    app.get("/api/user/:userId/recipe/:recipeId/fav", findFavRecipeForUser);
    app.put("/api/user/:userId/grocerylist", addToGrocList);
    app.put("/api/user/:loggeduserId/follow", follow);
    app.delete("/api/user/:loggeduserId/unfollowuser/:unfollowuserId", unfollow);
    app.put("/api/user/:userId/followedby", followedBy);
    app.delete("/api/user/:userId/unfollowedby/:unfollowedByUserId", unfollowedBy);
    app.delete("/api/user/:userId/grocerylist/:itemId", deleteItem);
    app.get('/auth/google/callback',
        ProjectPassport.authenticate('google', {
            successRedirect: '/project/#/personalinfo',
            failureRedirect: '/project/#/login'
        }));


    ProjectPassport.use(new GoogleStrategy(googleConfig, googleStrategy));
    function googleStrategy(token, refreshToken, profile, done) {
        prouserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return prouserModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }



    function followedBy(req, res) {
        var userId = req.params.userId;
        var followedByUser = req.body;

        prouserModel
            .followedBy(userId, followedByUser)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function unfollowedBy(req, res) {
        var userId = req.params.userId;
        var unfollowedByUserId = req.params.unfollowedByUserId;

        prouserModel
            .unfollowedBy(userId, unfollowedByUserId)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }


    ProjectPassport.use('foodap', new ProLocalStrategy(localStrategy));
    ProjectPassport.serializeUser(proserializeUser);
    ProjectPassport.deserializeUser(prodeserializeUser);


    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var type = req.body.type;

        prouserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return prouserModel
                            .createUser(req.body)
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user){
                        req.login(user, function (err) {
                             if(err) {
                                 res.status(400).send(err);
                             } else {
                                 res.json(user);
                             }
                        });
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function localStrategy(username, password, done) {
        prouserModel
            .findUserByUsername(username)
            .then(
                function (user) {

                    if(user && bcrypt.compareSync(password, user.password)){
                        done(null,user);

                    }else {
                        done(null, "Error in login!");
                    }
                },
                function(err) {
                    done(err);
                });
    }


    function proserializeUser(user, done) {
        done(null, user);
    }

    function prodeserializeUser(user, done) {
        prouserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    function prologin ( req, res){
        var user = req.user;
        res.json(user);
    }

    function prologgedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }

    }


    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;

        prouserModel
            .updateUser(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function createUser(req, res) {
        
        var username = req.body.username;
        
        prouserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return prouserModel
                            .createUser(req.body)
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user){
                        res.sendStatus(200);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

    }

    function deleteUser(req,res) {
        var id = req.params.userId;

        prouserModel
            .deleteUser(id)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }


    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(username, password, req, res);
        } else if(username){
            findUserByUsername(username, res);
        }else {
            findAllUsers(res);
        }
    }
    
    function findAllUsers(res) {
        prouserModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }



    function findUserByUsername(username, res) {
        prouserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function addToFavs(req, res) {
        var fav = req.body;
        var userId = req.params.userId;
        prouserModel
            .addToFavs(userId, fav)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }

    function removeFromFavs(req, res) {
        var recipeId = req.params.recipeId;
        var userId = req.params.userId;
        prouserModel
            .removeFromFavs(userId, recipeId)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }

    function follow(req, res) {
        var loggedInId = req.params.loggeduserId;
        var followingUser = req.body;

        prouserModel
            .follow(loggedInId, followingUser)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function unfollow(req, res) {
        var loggedInId = req.params.loggeduserId;
        var unfollowId = req.params.unfollowuserId;

        prouserModel
            .unfollow(loggedInId, unfollowId)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function findFavRecipeForUser(req, res) {
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        
        prouserModel
            .findFavRecipeForUser(userId, recipeId)
            .then(
                function (recipe) {
                    res.json(recipe)
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }
    
    function addToGrocList(req, res) {
        var userId = req.params.userId;
        var ing = req.body;

        prouserModel
            .addToGrocList(userId, ing)
            .then(
                function (stats) {
                    
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }

    function deleteItem(req, res) {
        var userId = req.params.userId;
        var itemId = req.params.itemId;
        
        prouserModel
            .deleteItem(userId, itemId)
            .then(
                function (stats) {

                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
                
            )
            
    }
    
    function findUserById(req, res) {
        var id = req.params.userId;

        prouserModel
            .findUserById(id)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }
};