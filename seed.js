const mongoose = require('mongoose'); // object
const Product = require('./models/product');  


const products = [
    {name: "Machbook",
    img:"https://images.unsplash.com/photo-1625242504139-087ef0e0923e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
    price: 300000,
    desc:"good machine"
},
    {name: "Ipad",
    img:"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D",
    price: 230000,
    desc:"good machine" 

},
    {name: "Apple watch",
    img:"https://images.unsplash.com/photo-1614106765035-bceac4ac1911?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFwcGxlJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    price: 30000,
    desc:"good machine"

}
]

 async function seedDB(){
    await Product.insertMany(products);
    console.log("DB seeded")
}

module.exports = seedDB;