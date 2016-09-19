"use strict";
var knex = require("./db/knex")
module.exports = {
    Posts: function() {
        return knex("users").join("post", "users.id", "post.user_id")
    },
    individualpost: function(id) {
        return knex("post").where({id:id})
    },
    Comments: function() {
        return knex("users").join("comment","users.id","comment.user_id ")
    },
    Comment: function(){
      return knex("comment")
    },
    Users: function() {
        return knex("users")
    },
    PostAnArticle: function(article, user_id, title) {
        return knex("post").insert({
            article: article,
            user_id: user_id,
            title: title.toUpperCase(),
        })
    },
    Postcomment: function(commentbody, userid, post_id) {
        return knex("comment").insert({
            commentbody:commentbody,
            user_id: userid,
            post_id: post_id,
        })
    },
    AddUser: function(name, username, password) {
        return knex("users").insert({
            name: name.toUpperCase(),
            username: username.toLowerCase(),
            password: password,
        })
    },
    DeletePost: function(id) {
        return knex("post").where({
            id: id
        }).del()
    },
    DeleteComment: function(id) {
        return knex("comment").where({
            id: id
        }).del()
    },
    updateComment: function(id,commentbody) {
        return knex("comment").where({
            id: id
        }).update({
          commentbody:commentbody
        })
    },
    updatePost: function(id,title,article) {
        return knex("post").where({
            id: id
        }).update({
          title:title.toUpperCase(),
          article:article
        })
    },
    DeletepostComments: function(id) {
        return knex("comment").where({
            post_id:id,
        }).del()
    },




    // ------------------
}
