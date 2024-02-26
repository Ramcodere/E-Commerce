const Product = require('./models/product');
const {productSchema , reviewSchema} =require('./schema');

const validateProduct = (req,res,next)=>{
    let {name , img , price , desc} = req.body;
    const {error} = productSchema.validate({name, img , price , desc})
    if(error){
         const msg = error.details.map((err)=>err.message).join(',');
         return res.render('error' , {err:msg})
    }
    next();

}

const validateRivew = (req,res,next)=>{
    let {rating , comment} = req.body;
    const {error} = reviewSchema.validate({rating , comment})
    if(error){
         const msg = error.details.map((err)=>err.message).join(',')
         return res.render('error' , {err:msg})
    }
    next();

}
    const isLoggedIn = (req,res,next)=>{

        if(req.xhr && !req.isAuthenticated()){
            // return  res.error({msg : 'you need to login first'})
            return  res.status({msg : 'you need to login first'})

        }
        //   console.log(req.xhr);  ajax hai kya nhi eski help se check karte hai
        if(!req.isAuthenticated()){
            req.flash('error' , 'You need to login first');
            return res.redirect('/login')
        }
        next();

    }

    const isSeller = (req,res,next)=>{
        let {id} = req.params;
        if(!req.user.role){
            req.flash('error' , 'You do not have a permisaion');
            return res.redirect('/products')
        }else if (req.user.role !== "seller"){
            req.flash('error' , 'You do not have a permisaion');
            return res.redirect(`/products/${id}`)
        }
        next();

    }


    const isProductAuthor = async (req, res, next) => {
        try {
            let { id } = req.params;
            let product = await Product.findById(id);
    
            // Check if product exists
            if (!product) {
                req.flash('error', 'Product not found');
                return res.redirect('/products');
            }
    
            // Check if product author is defined and compare with req.user._id
            if (!product.author || !product.author.equals(req.user._id)) {
                req.flash('error', 'You are not the owner of this product');
                return res.redirect(`/products/${id}`);
            }
    
            next();
        } catch (error) {
            console.error(error);
            req.flash('error', 'Something went wrong');
            res.redirect('/products');
        }
    };
    
     
module.exports = {validateProduct , validateRivew , isLoggedIn , isSeller ,  isProductAuthor}