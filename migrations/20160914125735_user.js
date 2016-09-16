"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table){
    table.increments();
    table.text("name");
    table.text("username");
    table.text("password")
  })
};
exports.down = function(knex, Promise) {
return knex.schema.dropTable("users")
};
