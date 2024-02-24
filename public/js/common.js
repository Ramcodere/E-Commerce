

let allLikeButton =  document.querySelectorAll('.like-btn');


  async function likeButton(productId, btn){
    // console.log('liked the product');
    try{

        let response = await axios({
            method: 'post' ,
            url: `/product/${productId}/like`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'     //AJAX req. confirm karne ke liye ye header dalna important rhata hai
              }
        })
        // console.log(response);
        if(btn.children[0].classList.contains('fa-regular')){
            btn.children[0].classList.remove('fa-regular')
            btn.children[0].classList.add('fa-solid')

        }else {
            btn.children[0].classList.remove(' fa-regular')
            btn.children[0].classList.add('fa-solid')

        }
    }
    catch(e){
        if(e.response.status === 401){

            window.location.replace('/login');
            console.log(e.message , 'error hai ye window vaali line ka')
        }

    }


 }

 for(let btn of allLikeButton){
    btn.addEventListener('click' , ()=>{
        let productId =  btn.getAttribute('product-id');
        likeButton(productId, btn);
    })
}




