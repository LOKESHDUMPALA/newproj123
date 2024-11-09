const Product = require('../../models/product');


 const getFilteredProducts = async(req,res) =>{
      try{  
      const { category=[], brand =[],sortBy="price-lowtohigh" } = req.query;
       console.log(req.query);
      let filters ={};
      
      if(category.length){
        filters.category = {$in: category.split(',')}
      }
      
      if(brand.length){
        filters.brand = {$in: brand.split(',')}
      }
     
      // {
      //   category: { $in: ['books', 'electronics'] },
      //   brand: { $in: ['nike', 'adidas'] }
      // }

      let sort ={};

      switch (sortBy) {
        case 'price-lowtohigh':
                              sort.price=1
          break;

        case 'price-hightolow':
                              sort.price=-1
          break;  

        case 'title-atoz':
                              sort.title=1
          break;

         case 'title-ztoa':
                              sort.title=-1
          break;
      
        default: 
              sort.price=1
          break;
      }


          const products = await Product.find(filters).sort(sort); 
        res.status(200).json({
            succes:true,
            data:products
        })
      } catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:'Some error occured'
        })
      }
 
 }

const getProductDetails = async(req,res) => {
   try{
     const {id} = req.params;
     const product = await Product.findById(id);
     
     if(!product) res.status(404).json({
      succes:false,
      message:'product not found'
     })

     res.status(200).json({
      succes:true,
      data : product
     })

   } catch(e){
    console.log(e);
    res.status(500).json({
        success:false,
        message:'Some error occured'
    })
   }


}


   module.exports = {getFilteredProducts , getProductDetails}