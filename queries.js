"use strict";
var knex = require("./db/knex")
module.exports = {
Posts:function(){
  return knex("post")
},
Comments:function(){
  return knex("comment")
},
Users : function(){
  return knex("users")
},
PostAnArticle:function(article,author,title){
  return knex("post").insert({
    article:article,
    author:author,
    title:title,
  })
},
Postcomment:function(commentbody,commentator,post_id){
  return knex("comment").insert({
    commentbody:commentbody,
    commentator:commentator,
    post_id:post_id,
  })
},
AddUser:function(name,username,password){
  return knex("users").insert({
    name:name,
    username:username,
    password:password,
  })
},






  // ------------------
}
