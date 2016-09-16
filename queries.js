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
        return knex("comment")
    },
    Users: function() {
        return knex("users")
    },
    PostAnArticle: function(article, user_id, title) {
        return knex("post").insert({
            article: article,
            user_id: user_id,
            title: title,
        })
    },
    Postcomment: function(commentbody, userid, post_id) {
        return knex("comment").insert({
            commentbody: commentbody,
            user_id: userid,
            post_id: post_id,
        })
    },
    AddUser: function(name, username, password) {
        return knex("users").insert({
            name: name,
            username: username,
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
          title:title,
          article:article
        })
    },





    // ------------------
}
