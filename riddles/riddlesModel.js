const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db("riddles");
}

function findById(id) {
  return db("riddles")
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  return db("riddles")
    .insert(user)
    .then((ids) => ({ id: ids[0] }));
}

function update(id, user) {
  return db("riddles").where("id", Number(id)).update(user);
}

function remove(id) {
  return db("riddles").where("id", Number(id)).del();
}
