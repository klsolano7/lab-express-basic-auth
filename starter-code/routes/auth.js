const express = require('express');
const router  = express.Router();
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const User = require('../model/user');


/* GET home page */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

// router.post('/signup', (req,res,next) =>{
//     console.log('save to signup.  save a new  user ', req.body)
//     res.redirect('/')
// })

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }


    User.findOne({ "username": username })
    .then(user => {
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists!"
      });
      return;
    }

    User.create({
      username,
      password: hashPass
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    })
  })

});








module.exports = router;






