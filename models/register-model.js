const mongoose = require("../db/connection");

const RegisterSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    notes: {
      // {
      //   // References use the type ObjectId
      //   type: mongoose.Schema.Types.ObjectId,
      //   // the name of the model to which they refer
      //   ref: "Note",
      // },
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Make sure to name the model with the singular Register!
// Mongoose pluralizes and lowercases the name of the model
// to name the collection of documents in the database that
// correspond to this model.
const Register = mongoose.model("Register", RegisterSchema);

module.exports = Register;
