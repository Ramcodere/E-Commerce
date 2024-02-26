const express = require ('express'); 
const User = require('../models/User');
const passport = require('passport');
// const User = require ('../models/User'); 

const router = express.Router();  

router.get('/register' ,(req,res)=>{
    res.render('auth/signup'); //yahan pr tum auth naam ke folder mai jao or baha se signup ka file utha lao 
})

router.post('/register' , async(req,res)=>{
    let { username , password , email , role , gender} = req.body; // Esami puri req. ki body ko distructure kara lege
    let user = new User({username , email , gender , role});
    let newUser = await User.register(user , password);
    // res.send(newUser);
    res.redirect('/login');

})

router.get('/login' , (req,res)=>{
    res.render('auth/login');
})

router.post('/login',
  passport.authenticate('local',
   { 
     failureRedirect: 'Login', 
     failureMessage: true
     }),
  function(req, res) {
    // console.log(req.user , "User");

    req.flash('success' , `Welcome Back ${ req.user.username }`)
    res.redirect('/products');
  });


  router.get('/logout' ,(req,res)=>{
    req.logout(()=>{
      req.flash('success' , 'Logged out successfully')
    res.redirect('/login');

    });
  })
 
module.exports = router;

