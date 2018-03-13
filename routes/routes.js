const bcrypt     = require("bcrypt");
const mongoose   = require("mongoose");
const jwt        = require("jsonwebtoken");
const db         = require("../models");
const request    = require("request");
const fs         = require("fs");
const Mailgun    = require("mailgun-js");

// Mailgun configuration.
const api_key = process.env["MAILGUN_API_KEY"];
const domain = process.env["MAILGUN_DOMAIN"];
const from_who = process.env["MAILGUN_FROM"];
const admin_email = process.env["ADMIN_EMAIL"];

// Import the email templates.
let emailTemplates = {};
fs.readdir(__dirname + "/../templates/", (err, items) => {

    for (let i=0; i < items.length; i++){

      let templateName = items[i];
      if(templateName.lastIndexOf(".") >= 0){
        templateName = templateName.slice(0, templateName.lastIndexOf("."));
      }
      fs.readFile(__dirname + "/../templates/" + items[i], "utf8", (err, html) => {
        if(err){
          console.log(err);
        } else{
          emailTemplates[templateName] = html;
        }
      });
    }
});

function verifyToken(req, res, next) {

  const token = req.header('Authorization');

  jwt.verify(token, process.env.SECRET_KEY,
    (err, data) => {
      if(err){
        res.sendStatus(403);
      } else{
        req.user = data;
        next();
      }
  });
}

module.exports = app => {
  
  app.post("/api/login", (req, res) => {

    db.User.findOne({email: req.body.email})
    .then( (user) => {

      if(!user){
        res.status(401).send({ messageText: "User not found." });
      } else if(user){

        if(!bcrypt.compareSync(req.body.password, user.password)){
          res.status(401).send({ messageText: "Password is incorrect." });
        } else{
          jwt.sign({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
            photoUrl: user.photoUrl
          }, process.env.SECRET_KEY, (err, token) => {
            if(err){
              console.log("error: "+err);
              res.status(401).send({ messageText: "Authentication error." });
            } else{
              res.json({ token: token });
            }
          });
        }
      }
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ messageText: "Error." });
    });
  
  });

  app.post("/api/signup", (req, res) => {

    db.User.findOne({email: req.body.email})
    .then( (user) => {
    
      if(user){
        res.status(401).json({ messageText: "User already exists." });
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
            email: result.email,
            location: result.location
          }, process.env.SECRET_KEY, (err, token) => {
            res.json({ token: token });
          });
        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ messageText: err.message });  
        });
      }
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).json({ messageText: "Error." });
    });
  });

  app.put("/api/updateUser/:id", verifyToken, (req, res) => {

    db.User.findOneAndUpdate({_id: req.params.id}, { $set: req.body}, { new: true })
    .then( (user) => {

      if(!user){
        res.status(401).send({ messageText: "User not found." });
      } else if(user){

          jwt.sign({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
            photoUrl: user.photoUrl
          }, process.env.SECRET_KEY, (err, token) => {
            if(err){
              console.log("error: "+err);
              res.status(401).send({ messageText: "Authentication error." });
            } else{
              res.json({ token: token, messageText: "Saved." });
            }
          });

      }
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ messageText: "Error." });
    });
  
  });

  app.get("/api/upcsearch/:upc", verifyToken, (req, res) => {

    let options = {
      url: "https://api.upcitemdb.com/prod/trial/lookup?upc="+req.params.upc
    };

    request(options, (error, response, body) => {

      if(error){
        console.log(error);
        res.status(500).send({ messageText: "Error." });
      } else{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if(body === ""){
          console.log("Response missing.");
          res.status(404).send({ messageText: "Response missing." });
        } else{
          res.send(JSON.parse(body));
        }
      }
    });
  });

  app.get("/api/productsearch/:text", verifyToken, (req, res) => {

    let options = {
      url: `https://api.upcitemdb.com/prod/trial/search?s=${req.params.text}&category=coffee`
    };

    request(options, (error, response, body) => {

      if(error){
        console.log(error);
        res.status(500).send({ messageText: "Error." });
      } else{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if(body === ""){
          console.log("Response missing.");
          res.status(404).send({ messageText: "Response missing." });
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

        res.status(401).send({ messageText: "Product already exists." });
      } else {

        let newProduct = req.body;
        newProduct.createdBy = req.user._id;

        db.Product.create(newProduct)
        .then( (product) => {
          res.status(200).send({ messageText: "Added." });
        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ messageText: "Error." });
        });
      }
    });
  });

  app.post("/api/pending/product", verifyToken, (req, res) => {

    db.Product.find().
    where("upc").equals(req.body.upc)
    .then( (products) => {

      if(products.length > 0){

        res.status(401).send({ messageText: "Product already exists." });
      } else {

        let newProduct = req.body;
        newProduct.createdBy = req.user._id;

        db.PendingProduct.create(newProduct)
        .then( (product) => {

          res.status(200).send({ messageText: "Thank you. This product is pending review." });

          let mailgun = new Mailgun({apiKey: api_key, domain: domain});

          let emailUser = {
            from: from_who,
            to: req.user.email,
            subject: "New Coffee Submitted",
            html: emailTemplates.new_product_user
          };

          mailgun.messages().send(emailUser, (err, body) => {
            if(err){
              console.log("Mailgun error: ", err);
            }
          });

          let emailAdmin = {
            from: from_who,
            to: admin_email,
            subject: "New Coffee Submitted",
            html: emailTemplates.new_product_admin
          };

          mailgun.messages().send(emailAdmin, (err, body) => {
            if(err){
              console.log("Mailgun error: ", err);
            }
          });

        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ messageText: "Error." });
        });
      }
    });
  });

  app.get("/api/products", (req, res) => {

    db.Product.find()
    .then( (products) => {

      res.json(products);
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ messageText: "Error." });
    });
  
  });

  app.get("/api/products/sorted/:sortField/:direction", (req, res) => {

    db.Product.find()
    .sort({[req.params.sortField]: req.params.direction})
    .then( (products) => {

      res.json(products);
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ messageText: "Error." });
    });
  
  });

  app.get("/api/product/:id", (req, res) => {

    db.Product.findById(req.params.id)
    .then( (product) => {

      res.json(product);
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ messageText: "Error." });
    });
  
  });

  app.get("/api/cafebyextid/:extId", (req, res) => {

    let fields = "firstName lastName location photoUrl";
    db.Cafe.findOne({externalId: req.params.extId})
    .populate({path: "reviews",     
               populate: {path: "postedBy", select: fields}})
    .then( (cafe) => {

      res.json(cafe);
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ messageText: "Error." });
    });
  
  });

  app.post("/api/cafesbyextids", (req, res) => {

    let fields = "avgRating externalId";
    db.Cafe.find({externalId: {$in: req.body.extIdArr}})
    .then( (cafes) => {

      res.json(cafes);
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ messageText: "Error." });
    });
  
  });

  app.get("/api/reviews/:id", (req, res) => {

    let fields = "firstName lastName location photoUrl";
    db.Product.findById(req.params.id)
    .populate({path: "reviews",     
               populate: {path: "postedBy", select: fields}})
    .then( (product) => {

      res.json(product.reviews);
    })
    .catch( (err) => {
      console.log("error: "+err);
      res.status(401).send({ messageText: "Error." });
    });
  
  });

  app.post("/api/review/:id", verifyToken, (req, res) => {

    db.Product.findById(req.params.id)
    .then( (product) => {

      if(product){

        let avgRating = product.avgRating;

        let newRating = parseFloat(avgRating + ((req.body.rating - avgRating) /
                                     (product.reviews.length + 1))).toFixed(2);

        db.Review.create(req.body)
        .then( (review) => {
          return db.Product.findByIdAndUpdate(req.params.id,
                { $push: {reviews: review._id }, $set: {avgRating: newRating} }, { new: true });
        })
        .then( (posted) => {
          res.status(200).send({ messageText: "Posted!" });
        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ messageText: "Error." });
        });
      } else{
        res.status(401).send({ messageText: "Product not found." });
      }
    });
  });

  app.post("/api/review/cafe/:id", verifyToken, (req, res) => {

    db.Cafe.findOne({externalId: req.params.id})
    .then( (cafe) => {

      if(cafe){

        let avgRating = cafe.avgRating;

        let newRating = parseFloat(avgRating + ((req.body.review.rating - avgRating) /
                                     (cafe.reviews.length + 1))).toFixed(2);

        db.Review.create(req.body.review)
        .then( (review) => {

          return db.Cafe.findByIdAndUpdate(cafe._id,
                { $push: {reviews: review._id }, $set: {avgRating: newRating} }, { new: true });
        })
        .then( (posted) => {
          res.status(200).send({ messageText: "Posted!" });
        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ messageText: "Error." });
        });
      } else{
     
        let newCafe = req.body.cafe;
        delete newCafe.id;
        newCafe.externalId = req.params.id;
        db.Cafe.create(newCafe)
        .then( (cafe) => {

          db.Review.create(req.body.review)
          .then( (review) => {

            let newRating = review.rating;
            return cafe.update({ $push: {reviews: review._id }, $set: {avgRating: newRating} }, { new: true });
          })
          .then( (posted) => {
            res.status(200).send({ messageText: "Posted!" });
          })
          .catch( (err) => {
            console.log("error: "+err);
            res.status(401).send({ messageText: "Error." });
          });
        })
        .catch( (err) => {
          console.log("error: "+err);
          res.status(401).send({ messageText: "Error." });
        });
      }
    });
  });
};