"use strict";
var passport = require("passport")
var Local = require("passport-local")
var users = require("./users")

passport.use(new Local(function(username, password, done) {
    users.authenticateUser(username, password)
    .then(function(isitauthenticated){
      if(!isitauthenticated ){
        done(null, false,{wrongpass:"wrong password"})
        return
      }
       users.findUser(username)
       .then(function(user){
         done(null, user)
       })
       })
}))
passport.serializeUser(function(user, done) {
    done(null, user.username)
})
passport.deserializeUser(function(username, done) {
    users.findUser(username)
    .then(function(user){
      done(null, user)
    })
})

module.exports = passport
