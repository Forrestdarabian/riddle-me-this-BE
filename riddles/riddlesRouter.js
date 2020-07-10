const express = require("express");
const router = express.Router();

const Riddles = require("./riddlesModel");

// GET REQUEST

router.get("/", (req, res) => {
  Riddles.find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "Couldn't Retrieve Riddles!",
      });
    });
});

// GET BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Riddles.findById(id)
    .then((item) => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({
          message: "The Riddle with the specified ID does not exist...",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "The Riddle info could not be retrieved...",
      });
    });
});

// POST REQUEST
router.post("/", (req, res) => {
  const { name, description, username } = req.body;
  Riddles.insert(req.body)
    .then((item) => {
      if (item) {
        res.status(201).json(item);
      } else {
        res
          .status(400)
          .json({ message: "Please provide all fields for this post." });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "There was an error saving this Riddle to the database.",
      });
    });
});

// PUT REQUEST
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, username } = req.body;
  if (name && description && username) {
    Riddles.update(id, req.body)
      .then((updatedItem) => {
        if (updatedItem) {
          res.status(200).json(updatedItem);
        } else {
          res.status(404).json({
            message: "The Riddle with the specified ID does not exist...",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          err: err,
          message: "The Riddle info could not be retrieved.",
        });
      });
  }
});

// DELETE REQUEST

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Riddles.remove(id)
    .then((item) => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({
          message: "The Riddle with the specified ID does not exist...",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "The Riddle could not be removed...",
      });
    });
});

module.exports = router;
