var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;
 
    app.get("/api/user", getUsers);
    app.get("/auth/facebook", passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    app.post("/api/logout", logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    app.post("/api/login", passport.authenticate('wam'), login);//created afer introduction of sessions/passport
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);



    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };


    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));
    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
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
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                    if(user && bcrypt.compareSync(password, user.password)){
                        done(null,user);
                    }else {
                        done(null, "Error in login");
                    }
                },
                function(err) {
                    done(err);
                });
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
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



    function login ( req, res){
        var user = req.user;
        res.json(user);
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }

    }

    function facebookLogin(token, refreshToken, profile, done) {
       // console.log(profile);
        userModel
            .findFacebookUser(profile.id)
            .then(
                function (facebookUser) {
                    if(facebookUser){
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function (user) {
                                    done(null, user);
                                }
                            )
                    }
                }
            )
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;
        
        userModel
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
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function deleteUser(req,res) {
        var id = req.params.userId;

        userModel
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
            findAllUsers();
        }
    }
    
    function findAllUsers() {
        userModel
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
    }
};