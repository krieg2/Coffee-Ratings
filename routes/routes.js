const bcrypt     = require("bcrypt");
const mongoose   = require("mongoose");
const jwt        = require("jsonwebtoken");
const db         = require("../models");

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

module.exports = app => {

  app.post("/api/post", getToken, (req, res) => {

    jwt.verify(req.token, process.env.SECRET_KEY,
      {expiresIn: '4h'}, (err, data) => {
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
    .then( (user) => {

      if(!user){
        res.status(401).send({ message: "User not found." });
      } else if(user){

        if(!bcrypt.compareSync(req.body.password, user.password)){
          res.status(401).send({ message: "Password is incorrect." });
        } else{
          jwt.sign({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
          }, process.env.SECRET_KEY, (err, token) => {
            if(err){
              console.log("error: "+err);
              res.status(401).send({ message: "Authentication error." });
            } else{
              res.json({ token: token });
            }
          });
        }
      }
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ message: "Error." });
    });
  
  });

  app.post("/api/signup", (req, res) => {

    db.User.findOne({email: req.body.email})
    .then( (user) => {
    
      if(user){
        res.status(401).json({ message: "User already exists." });
      } else if(!user){

        let newUser = req.body;
        newUser.password = bcrypt.hashSync(req.body.password, 10);

        //Create the user record.
        db.User.create(newUser)
        .then( (result) => {

          jwt.sign({
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName
          }, process.env.SECRET_KEY, (err, token) => {
            res.json({ token: token });
          });
        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ message: err });  
        });
      }
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).json({ message: "Error." });
    });
  });

};