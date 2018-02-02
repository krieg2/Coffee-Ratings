const bcrypt     = require("bcrypt");
const mongoose   = require("mongoose");
const jwt        = require("jsonwebtoken");
const db         = require("../models");

function verifyToken(req, res, next) {

  const token = req.header('Authorization');

  jwt.verify(token, process.env.SECRET_KEY,
    (err, data) => {
      if(err){
        res.sendStatus(403);
      } else{
        next();
      }
  });
}

module.exports = app => {
  
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
            lastName: user.lastName,
            email: user.email,
            location: user.location
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
            lastName: result.lastName,
            email: user.email,
            location: user.location
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

  app.put("/api/updateUser/:id", verifyToken, (req, res) => {

    db.User.findOneAndUpdate({_id: req.params.id}, { $set: req.body}, { new: true })
    .then( (user) => {

      if(!user){
        res.status(401).send({ message: "User not found." });
      } else if(user){

        
          jwt.sign({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            location: user.location
          }, process.env.SECRET_KEY, (err, token) => {
            if(err){
              console.log("error: "+err);
              res.status(401).send({ message: "Authentication error." });
            } else{
              res.json({ token: token });
            }
          });

      }
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ message: "Error." });
    });
  
  });
};