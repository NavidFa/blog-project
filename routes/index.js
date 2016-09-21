"use strict";

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var query = require("../queries");
var passport = require('../passport');

var users = require("../users")

/* GET home page. */
router.get('/', function(req, res, next) {
    query.Posts().orderBy('post.id', 'desc').limit(10)
        .then(function(posts) {
            res.render('index', {
                posts: posts,
                user: req.user,
                verified: req.isAuthenticated(),
            })
        })
});
router.get('/individualpost/:id', function(req, res, next) {
    query.Posts().where("post.id", req.params.id)
        .then(function(posts) {
            return query.Comments().orderBy("comment.id", "desc").where({
                    post_id: req.params.id
                })
                .then(function(comments) {
                    if (req.user) {
                        for (var i in comments) {
                            if (comments[i].user_id == req.user.id) {
                                comments[i].commentator = true;
                            } else {
                                comments[i].commentator = false;
                            }
                        }
                    }
                    console.log(comments)
                    res.render('individualpost', {
                        posts: posts,
                        comments: comments,
                        user: req.user,
                        verified: req.isAuthenticated(),
                        id: req.params.id,
                        owner: req.user ? posts[0].user_id == req.user.id : false,
                        commentator: comments.commentator,
                    })
                })
        })

})

router.get('/post', function(req, res, next) {
    res.render('post', {
        user: req.user,
    })
});
router.get('/chat', function(req, res, next) {
    res.render('chat',{
      verified: req.isAuthenticated(),
      user: req.user,
    })
});
router.get('/updatearticle/:id/:user', function(req, res, next) {
    query.individualpost(req.params.id)
        .then(function(post) {
            res.render('updatearticle', {
                post: post,
                owner: req.user ? req.params.user == req.user.id : false,
            })
        })
});

router.get('/login', function(req, res, next) {

    res.render('login' ,{
        flash: req.flash()
    })

});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect(req.get('referer'));
});
router.get('/modifycomment/:id/:user', function(req, res, next) {
    query.Comment().where({
            id: req.params.id
        })
        .then(function(comment) {
            res.render('modify', {
                comment: comment,
                owner: req.user ? req.params.user == req.user.id : false,
            })

        })
})
router.post('/postanarticle/:id', function(req, res, next) {
    query.PostAnArticle(req.body.article, req.params.id, req.body.title)
        .then(function() {
            res.redirect('/')
        })
});

router.post('/postcomment/:id/:user', function(req, res, next) {
    var id = req.params.id;
    query.Postcomment(req.body.commentbody, req.params.user, req.params.id)
        .then(function() {
            res.redirect('/individualpost/' + id);
        })
});
router.post('/register', function(req, res, next) {
    users.Register(req.body.name, req.body.username, req.body.password)
        .then(function(error) {
            res.render('login')
        })
})

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
}))

router.post('/post/:id/delete', function(req, res, next) {
    query.DeletePost(req.params.id)
        .then(function() {
            query.DeletepostComments(req.params.id)
                .then(function() {
                    res.redirect('/')
                })
        })
})
router.post('/comment/:id/delete/:post_id', function(req, res, next) {
    query.DeleteComment(req.params.id)
        .then(function() {
            res.redirect('/individualpost/' + req.params.post_id)
        })
})
router.post('/comment/:id/update/:post_id', function(req, res, next) {
    query.updateComment(req.params.id, req.body.commentbody)
        .then(function() {
            res.redirect('/individualpost/' + req.params.post_id)
        })
})
router.post('/post/:id/update', function(req, res, next) {
    query.updatePost(req.params.id, req.body.title, req.body.article)
        .then(function() {
            res.redirect('/individualpost/' + req.params.id)
        })
})


module.exports = router;
