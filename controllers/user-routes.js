const express = require("express");
const { findOne } = require("../models/register-model");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// import the register model
const Register = require("../models/register-model");

//Routes
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send("No User Exists");
      console.log(req.user);
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", (req, res) => {
  Register.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newRegister = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      });
      await newRegister.save();
      res.send("User Created");
    }
  });
});
router.get("/register", (req, res) => {
  Register.find({}).then((users) => res.json(users));
});

//////////////NOTES related changes ///////////

router.get("/register/single/:id", (req, res) => {
  Register.findById(req.params.id).then((users) => res.json(users));
});

router.put("/register/update/:id", (req, res) => {
  const id = req.params.id;
  Register.findOneAndUpdate(
    { _id: id },
    {
      notes: req.body.notes,
    },
    { new: true }
  )
    .then((user) => {
      res.json(user);
    })
    .catch(console.error);
});

/// Delete route
router.delete("/register/single/:id", (req, res) => {
  const id = req.params.id;
  Register.findOneAndRemove({ _id: id }).then(() => {
    res.send("entry deleted successfully");
  });
});

///////// NOTES Changes//////////////
// Update: Update notes for a specific user
// router.put("/:username", (req, res) => {
//   res.send({ type: "PUT" });
// res.send(req.body);
//   const username = req.params.username;
//   const notes = req.params.notes;
//   Register.findOneAndUpdate(
//     {
//       username: { $regex: username, $options: "i" },
//     },
//     { notes: notes },
//     {
//       new: true,
//     }
//   )
//     .then(console.log(res.body))
//     .catch(console.error);
// });

module.exports = router;
