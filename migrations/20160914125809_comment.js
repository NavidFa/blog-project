"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comment", function(table){
    table.increments();
    table.text("commentator");
    table.text("commentbody");
    table.integer("post_id").references("id").inTable("post");
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable("comment")
};
