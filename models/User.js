const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
// username - PLM ( passport- local- mongoose)
// passward - PLM ( passport- local- mongoose)


    email:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        default:'buyer'

    },
    gender:{
        type:String,
        trim:true,
        required:true
    },
    wishlist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    
    ],
    cart:[   //Add to card ki button ke liye Chalenge #1..
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    
    ],

})

userSchema.plugin(passportLocalMongoose); // Always apply on schema

let User = mongoose.model('User' , userSchema);
module.exports = User;