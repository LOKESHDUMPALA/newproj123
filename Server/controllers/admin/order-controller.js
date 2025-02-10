
const Order = require("../../models/Orders");


const getAllOrdersOfAllUsers = async(req,res) => {
    try {
       
        const orders  = await Order.find({ });

        if(!orders.length){
            return res.status(404).json({
                success : false,
                message : 'No orders found !'
            })
        }

      res.status(200).json({
        success :true,
        data : orders
      })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message:"some error"
        })
    }
};


const getOrderDetailsForAdmin = async(req , res ) => {
    try{
            
        const { id} = req.params;

        const order  = await Order.findById(id);

        if(!order){
            return res.status(404).json({
                success : false,
                message : "no orders found!"
            })
        }

        res.status(200).json({
            success :true,
            data : order
          })

    } catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message:"some error"
        })
    }
}

const updateOrderStatus = async(req , res) => {
    try{
          const {id} = req.params;
          const {orderStatus} = req.body;
          const order  = await Order.findById(id);

          if(!order){
            return res.status(404).json({
                success : false,
                message : "no orders found!"
            })
        }
       await Order.findByIdAndUpdate(id,{orderStatus});
       
      res.status(200).json({
        success : true,
        message: 'order status is updated successfully'
      })

    } catch( e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message:"some error"
        })
    }
}


module.exports = {getAllOrdersOfAllUsers,getOrderDetailsForAdmin, updateOrderStatus};


