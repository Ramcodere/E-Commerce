const express = require('express');
const app = express(); //instance
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed')
const productRoutes = require('./routes/productRoutes')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart'); // Or ab es niche app.use mai require krma hota hai
const productApi = require('./routes/api/productapi'); //Api
const passport = require('passport');//passport
const LocalStrategy = require('passport-local'); //passport
const User = require('./models/User'); //passport -> // model ke uper direct lagne bali method ko stetic method khete hai
const dotenv = require('dotenv').config()

mongoose.set('strictQuery', true);
let url = 'mongodb+srv://Ram123:Ram321@cluster0.yedozvf.mongodb.net/E-CommerceretryWrites=true&w=majority'
mongoose
.connect(url)
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log(err)})
 

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'views'));
// now for public folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// seeding dummy data
// seedDB();

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true ,
    cookie:{
        httpOnly:true ,
        expires : Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000
    }
}

app.use(session(configSession));
app.use(flash()); //Esko hamesha session ke bad hi likhte hai 



//passport -> Ye hamesha yad rakhna ki passport hamesha session ke niche rakhte hai
// use static serialize and deserialize of model for passport session support
app.use(passport.initialize()); //passport
app.use(passport.session()); // aab es se hum session ko bhi use kr sakte hai

 
passport.serializeUser(User.serializeUser());//passport
passport.deserializeUser(User.deserializeUser());//passport


//use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate())); //passport


app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


//Home - Page ....

app.get("/", (req,res) => {
    res.render("home");
});



// seedDB()

// so that harr incoming request ke liye routing check ki jay
//Routes
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes );

app.use(productApi);


app.listen(process.env.PORT , ()=>{
console.log(`Server is running on port ${process.env.PORT}`);
})

// 1. Basic Serverr
// 2. mongoose connection
// 3. model -> seed data
// 4. routes -> viwes
// 5. rating -> product change -> form to add the rating and comments (show.ejs)



// let url = 'mongodb+srv://ram4321:ram123@cluster0.tdulez6.mongodb.net/ram321retryWrites=true&w=majority&appName=Cluster0'
