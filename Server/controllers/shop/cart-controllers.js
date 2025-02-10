const Cart = require('../../models/Cart');
const Product = require('../../models/product');


const addToCart = async(req,res) => {
      try{
          
      const { userId, productId, quantity } = req.body;
    
      if( !userId || !productId || quantity <=0) {
           return res.status(400).json({
            success:false,
            message:'Invalid Data provided'
           })
      }

      const product = await Product.findById(productId);
    
      if(!product ){
        return res.status(404).json({
            success:false,
            message:'product not found'
           })
      } 
      // check cart is created or not 
      let cart = await Cart.findOne({userId});
     
      if(!cart) {
           cart = new Cart({userId,items : []})
      }
      // check the product is already present in the cart or not , if present just increase quantity else add the product 
      const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      
      if(findCurrentProductIndex === -1){
        cart.items.push({productId,quantity});
      } else {
        cart.items[findCurrentProductIndex].quantity +=quantity;
      }
        
      await cart.save();
      res.status(200).json({
        success : true,
        data : cart
      })
      } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message : "error"
        })
      }

}


const fetchCartItems = async(req,res) => {
    try{
        const {userId } = req.params;
          
        if(!userId){
          return res.status(400).json({
            success:false,
            message:'User id mandatory '
           })
        }
        
       const cart = await Cart.findOne({userId}).populate({
        path : 'items.productId',
        select : "image title price salePrice",
       })

       if(!cart ) {
        return res.status(404).json({
          success:false,
          message:'cart not found'
         });
       }
    // check , u r adding  an item in a cart which is deleted by admin in thier products, then it is remove from your cart
    // if the productId given to populate method checks in the Product model , if it does not match with any record , then it returns NULL.
    
    const validItems = cart.items.filter(productItems => productItems.productId); 
    
    if(validItems.length < cart.items.length){
      cart.items = validItems;
      await cart.save();
    }
   
    const populateCartItems = validItems.map(item  => ({
        productId : item.productId._id,
        image : item.productId.image,
        title : item.productId.title,
        price : item.productId.price,
        salePrice : item.productId.salePrice,
        productId : item.productId._id,
        quantity : item.quantity
    }));
   
     // ._doc is used for raw data 
    res.status(200).json({
      success : true,
      data : {
           ...cart._doc,
           items : populateCartItems
      }
    })

    } catch(error){
      console.log(error);
      res.status(500).json({
          success: false,
          message : "error"
      })
    }

}


const updateCartItemQty = async(req,res) => {
    try{
             
      const { userId, productId, quantity } = req.body;
       
      if( !userId || !productId || quantity <=0) {
           return res.status(400).json({
            success:false,
            message:'Invalid Data provided'
           })
      }  
      
      let cart = await Cart.findOne({userId});

      if(!cart ) {
        return res.status(404).json({
          success:false,
          message:'cart not found'
         });
       }

     const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);  
    
     if(findCurrentProductIndex === -1){
          return res.send(404).json({
            success: false,
            message :"cart item not present"
          })
    } 

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
       path : 'items.productId',
       select : "image title price salePrice",
    })

    
    const populateCartItems = cart.items.map(item  => ({
      productId :item.productId?  item.productId._id : null,
      image : item.productId? item.productId.image : null,
      title : item.productId? item.productId.title : 'product not found',
      price : item.productId? item.productId.price : null,
      salePrice :item.productId? item.productId.salePrice : null,
      quantity : item.quantity
  }));

  res.status(200).json({
    success : true,
    data : {
         ...cart._doc,
         items : populateCartItems,
    }
  })

    } catch(error){
      console.log(error);
      res.status(500).json({
          success: false,
          message : "error"
      })
    }

}


const deleteCartItem = async(req,res) => {
    try{
         const {userId, productId } = req.params;

         if(!userId || !productId ){
          return res.status(400).json({
            success : false,
            message : "Invalid data provided",
          })
         }
        
         const cart = await Cart.findOne({userId}).populate({
          path : 'items.productId',
          select : "image title price salePrice",
         })
  
         if(!cart ) {
          return res.status(404).json({
            success:false,
            message:'cart not found'
           });
         }
    
         cart.items = cart.items.filter( item => item.productId._id.toString() !== productId);
        await cart.save(); 

        await cart.populate({
          path : 'items.productId',
          select : "image title price salePrice",
         })
     
         const populateCartItems = cart.items.map(item  => ({
          productId :item.productId?  item.productId._id : null,
          image : item.productId? item.productId.image : null,
          title : item.productId? item.productId.title : 'product not found',
          price : item.productId? item.productId.price : null,
          salePrice :item.productId? item.productId.salePrice : null,
          quantity : item.quantity
      }));

  res.status(200).json({
    success : true,
    data : {
         ...cart._doc,
         items : populateCartItems,
    }
  })

        
    } catch(error){
      console.log(error);
      res.status(500).json({
          success: true,
          message : "error"
      })
    }

}

module.exports = {
    addToCart , 
    updateCartItemQty,
    fetchCartItems,
    deleteCartItem};