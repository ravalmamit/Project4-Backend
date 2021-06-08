// const express = require("express");
// const router = express.Router();

// import the notes model
// const Notes = require("../models/notes-model");

// Index: GET all users in database
// router.get("/", (req, res) => {
//   Notes.find({})
//     .then((note) => res.json(note))
//     .catch(console.error);
// });

// Create: Create a new note for a specific user
// router.post("/", (req, res) => {
//   Notes.create(req.body)
//     .then((note) => res.json(note))
//     .catch(console.error);
// });

// Update: Update notes for a specific user
// router.put("/", (req, res) => {
//   const username = req.params.username;
//   Notes.findOneAndUpdate(
//     {
//       username,
//     },
//     req.body,
//     {
//       new: true,
//     }
//   )
//     .then(console.log(res.body))
//     .catch(console.error);
// });

// module.exports = router;
