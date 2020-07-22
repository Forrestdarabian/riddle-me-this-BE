exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username").unique().notNullable();
      tbl.string("password").notNullable();
    })
    .createTable("riddles", (tbl) => {
      tbl.increments();
      tbl.string("name", 255).notNullable();
      tbl.string("description").notNullable();
      tbl.string("username").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("riddles").dropTableIfExists("users");
};
