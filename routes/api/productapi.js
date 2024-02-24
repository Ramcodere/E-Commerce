


const express = require ('express'); 
const { isLoggedIn } = require('../../middleware');
const User = require ('../../models/User'); 

const router = express.Router();  

router.post('/product/:productId/like' , isLoggedIn , async (req,res)=>{
    let{productId} = req.params;
    let user = req.user;
    let isLike = user.wishlist.includes(productId)
    if(isLike){
        await User.findByIdAndUpdate(req.user._id , {$pull: {wishlist :productId}});
    }else{
         await User.findByIdAndUpdate(req.user._id , {$addToSet: {wishlist :productId}});


    }
    // console.log(isLike);

})

module.exports = router;
