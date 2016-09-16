"use strict";

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var query = require("../queries");
var passport = require('../passport');

var users = require("../users")

/* GET home page. */
router.get('/', function(req, res, next) {
    query.Posts().orderBy('id','desc').limit(10)
        .then(function(posts) {
            res.render('index', {
                posts: posts,
                user: req.user,
                verified: req.isAuthenticated(),
            })
        })
});
router.get('/individualpost/:id', function(req, res, next) {
query.Posts().where({
        id: req.params.id
    })
    .then(function(posts) {
        return query.Comments().orderBy('id','desc').where({
                post_id: req.params.id
            })
            .then(function(comments) {
                res.render('individualpost', {
                    posts: posts,
                    comments: comments,
                    user: req.user,
                    verified: req.isAuthenticated(),
                    id:req.params.id,
                    owner:req.user?posts[0].user_id==req.user.id:false
                })
            })
    })

    })

 router.get('/post', function(req, res, next) {
    res.render('post')
});
router.get('/login', function(req, res, next) {
    res.render('login')
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect(req.get('referer'));
});

router.post('/postanarticle', function(req, res, next) {
    article = req.body.article
    author = req.body.author
    title = req.body.title;
    query.PostAnArticle(article, author, title)
        .then(function() {
            res.redirect('/')
        })
});
router.post('/post/:id/delete', function(req, res, next) {
    query.Posts().where({
            id: req.params.id
        }).del()
        .then(function() {
            res.redirect('/')
        })
});
router.post('/postcomment/:id/:username', function(req, res, next) {
    commentbody = req.body.commentbody;
    post_id = req.params.id;
    commentator = req.params.username;
    query.Postcomment(commentbody, commentator, post_id)
        .then(function() {
          id= req.params.id;
            res.redirect('/individualpost/'+   id);
        })
});
router.post('/register', function(req, res, next) {
    users.Register(req.body.name, req.body.username, req.body.password)
        .then(function() {
            res.redirect('/');
        })
});
 router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}))


module.exports = router;
