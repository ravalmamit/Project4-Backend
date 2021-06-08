// db/connection.js
// Require Mongoose:
const mongoose = require("mongoose");

// Store the URI for our database in a variable.
// When we're working locally, we'll have a local DB,
// but in production, we'll have to have a database
// that's connected to the Internet.
const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : "mongodb://localhost/backend-vopenhouse";

// Use the mongoose connect method to connect to the
// database.  The connect method takes two arguments:
// the address of the database and an object containing
// any options.
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  // The connect method is asynchronous, so we can use
  // .then/.catch to run callback functions
  // when the connection is opened or errors out.
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log("Connection failed!", error));

// Export mongoose so we can use it elsewhere
module.exports = mongoose;
