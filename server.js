const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");
const jwt        = require("jsonwebtoken");
const mongoose   = require("mongoose");
const bcrypt     = require("bcrypt");
const PORT       = process.env.PORT || 3001;
// Environment variables.
require("dotenv").config();
// Express.
const app = express();
//MongoDB database config.
const db = require("./models");
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

function getToken(req, res, next) {
  const bearerHeader = req.headers['Authorization'];
  if(bearerHeader){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else{
      res.sendStatus(403);
  }
}

app.post("/api/post", getToken, (req, res) => {

  jwt.verify(req.token, process.env.SECRET_KEY,
      {expiresIn: 60}, (err, data) => {
    if(err){
      res.sendStatus(403);
    } else{
      res.json({
          message: "Post created.",
          data: data
      });
    }
  });
});

app.post("/api/login", (req, res) => {

  db.User.findOne({email: req.body.email})
  .then( (err, user) => {

    if(err){
      console.log("error:"+err);
    } else if(!user){
      res.status(401).json({ message: "User not found." });
    } else if(user){

      if(!bcrypt.compareSync(req.body.password, user.password)){
        res.status(401).json({ message: "Password is incorrect." });
      } else{
        jwt.sign({_id: user._id}, process.env.SECRET_KEY, (err, token) => {
          res.json({token: token});
        });
      }
    }
  });
  
});

app.post("/api/signup", (req, res) => {

  db.User.findOne({email: req.body.email})
  .then( (err, user) => {
    if(err){
      console.log("error:"+err);
      res.status(400).send({message: err});
    } else if(user){
      res.status(401).json({ message: "User already exists." });
    } else if(!user){

      let newUser = req.body;
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      //Create the user record.
      db.User.create(newUser)
      .then(function(result){
        if(err){
          console.log("error:"+err);
          res.status(400).send({message: err});  
        } else{
          jwt.sign({_id: result._id}, process.env.SECRET_KEY, (err, token) => {
            res.json({token: token});
          });
        }
      });
    }
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
