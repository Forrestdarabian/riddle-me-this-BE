const db = require("../data/dbConfig");

function getAll() {
  return db("users");
}

function findBy(where) {
  return db("users").where(where);
}

function findByUsername(username) {
  return findBy({ username }).first();
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => id);
}

function remove(id) {
  return db("users").where({ id }).del();
}

module.exports = { getAll, findBy, findByUsername, addUser, remove };
