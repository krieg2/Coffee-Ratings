const bcrypt     = require("bcrypt");
const mongoose   = require("mongoose");
const jwt        = require("jsonwebtoken");
const db         = require("../models");
const request    = require("request");

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

  app.get("/api/upcsearch/:upc", verifyToken, (req, res) => {

    let options = {
      url: "https://api.upcitemdb.com/prod/trial/lookup?upc="+req.params.upc
    };

    request(options, (error, response, body) => {

      if(error){
        console.log(error);
        res.status(500).send({ message: "Error." });
      } else{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if(body === ""){
          console.log("Response missing.");
          res.status(404).send({ message: "Response missing." });
        } else{
          res.send(JSON.parse(body));
        }
      }
    });
  });

  app.post("/api/product", verifyToken, (req, res) => {

    db.Product.find().
    where("upc").equals(req.body.upc)
    .then( (products) => {

      if(products.length > 0){

        res.status(401).send({ message: "Product already exists." });
      } else {

        db.Product.create(req.body)
        .then( (product) => {
          res.status(200).send({ message: "Added." });
        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ message: "Error." });
        });
      }
    });
  });

  app.get("/api/product", (req, res) => {

    db.Product.find()
    .then( (products) => {

      res.json(products);
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ message: "Error." });
    });
  
  });

  app.post("/api/review/:id", verifyToken, (req, res) => {

    db.Product.findById(req.params.id)
    .then( (products) => {

      if(products){

        db.Review.create(req.body)
        .then( (review) => {
          return db.Product.findByIdAndUpdate(req.params.id,
                { $push: {reviews: review._id } }, { new: true });
        })
        .then( (posted) => {
          res.status(200).send({ message: "Added." });
        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ message: "Error." });
        });
      } else{
        res.status(401).send({ message: "Product not found." });
      }
    });
  });
};