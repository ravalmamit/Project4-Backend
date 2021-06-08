const mongoose = require("../db/connection");

const NoteSchema = new mongoose.Schema(
  {
    name: String,
    note: String,
    Register: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
