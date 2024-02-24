
const express = require("express");
const { isLoggedIn } = require("../middleware");
const User = require("../models/User");
const Product = require("../models/product");
const router = express.Router();
const stripe = require('stripe')('sk_test_51OaJKASHDqvb9YY7jBj8SJG7SHXA8JHTELDvKvvYL1H6NvsEMSZGo93piQajUBcPLerXEfgSivNnIE25gSnOlPuz00oxHobakM')



router.get("/user/cart", isLoggedIn, async (req, res) => {
  let userId = req.user._id;
  let user = await User.findById(userId).populate("cart");

  let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
  //   console.log(totalAmount);

  res.render("cart/cart", { user, totalAmount });
});

router.post("/user/:productId/add", isLoggedIn, async (req, res) => {
  let { productId } = req.params;
  let userId = req.user._id;
  let user = await User.findById(userId);

  let product = await Product.findById(productId);
  user.cart.push(product);
  await user.save();
  res.redirect("/user/cart");
});

router.get('/payment/:id',async(req,res)=>{
  let id = req.params.id;
  let data = await User.findById(id).populate("cart");
  let cart = [...data.cart]
  let g = cart.map((items)=>{
    return items
  })

    console.log(g)
  const session = await stripe.checkout.sessions.create({
          line_items: g.map(item=>{
        return{

          price_data: {
            currency: 'inr',
            product_data: {
              name: 'item.name',
            },
            unit_amount: item.price,  // es 2k ka matlab hota hai 20rs or uske aange ke zeroo ka matlab pasie hote hai hum esko . ya point mai nhi rikh sakte hai
          },
          quantity: 1,
        }
              
          }),
              
          

          mode: 'payment',
          success_url: 'https://example.com/success',
          cancel_url: 'https://example.com/cancel',
        });
    
        res.redirect(303, session.url);
    });
    
//     // Define success route
// router.get('/success', (req, res) => {
//   // Display success message to the user
//   res.render('success', { title: 'Payment Success' });
// });

// // Define cancel route
// router.get('/cancel', (req, res) => {
//   // Display cancel message to the user
//   res.render('cancel', { title: 'Payment Cancelled' });
// });



module.exports = router;






