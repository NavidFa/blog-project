"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comment", function(table){
    table.increments();
    table.text("commentbody");
    table.integer("user_id");
    table.integer("post_id");
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable("comment")
};
