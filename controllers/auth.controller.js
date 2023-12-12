const mongoose = require('mongoose');
const User = require('../models/User.model');

module.exports.register = (req, res, next) => {
  res.render('auth/register');
}; 

module.exports.doRegister = (req, res, next) => {
    const { username, email, password } = req.body;
  
    User.findOne({ email })
      .then((dbUser) => {
        if (dbUser) {
          res.render("auth/register", {
            user: {
              email,
              username,
            },
            errors: {
              email: "Email is already registered!",
            },
          });
        } else {
          User.create({
            username,
            email,
            password,
          }); 
          res.redirect("/login")
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  module.exports.login = (req, res, next) => {
    res.render('auth/login', { errors: false});
  }; 
  
  module.exports.doLogin = (req, res, next) => {
    const { email, password } = req.body;
  
    const renderWithErrors = (msg) => {
      res.render('auth/login', {
        email, 
        errors: {
          msg: msg || 'Email or password are incorrect'
        }, 
      });
    }; 
  
    if (!email || !password) {
      renderWithErrors();
    } else {
      User.findOne({email}) 
       .then((dbUser) => {
        if (!dbUser) {
          renderWithErrors();
        } else {
          dbUser 
            .checkPassword(password)
            .then((match) => {
                if (!match) {
                    renderWithErrors();
                } else {
                    res.redirect('/profile');
                }
            })
            .catch((err) => next(err));
        }
       })
       .catch((err) => next(err));
    }
  };
