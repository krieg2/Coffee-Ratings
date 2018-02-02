const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");
const mongoose   = require("mongoose");
const PORT       = process.env.PORT || 3001;

// Environment variables.
require("dotenv").config();
// Express.
const app = express();
//MongoDB database config.
mongoose.Promise = Promise;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/coffeeRatings";
mongoose.connect(MONGODB_URI);
mongoose.connection.on("error", console.error.bind(console, "connection error:"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Handles data parsing.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

require("./routes/routes.js")(app);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
