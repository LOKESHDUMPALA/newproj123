const Order = require("../../models/Orders");
const Product = require("../../models/product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
    try {
        const { productId,
                userId,
                userName,
                reviewMessage,
                reviewValue    } = req.body;
                
     // check whtether the user is purchased or not to give review
        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: "confirmed"
        });
     
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "you need to purchase product to review it"
            })
        }
 // check for already given the review or not 
        const checkExistingReview = await ProductReview.findOne({ productId, userId });

        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                messsage: "you already reviewed this product"
            })
        }

        const newReview = new ProductReview({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue
        });
        await newReview.save();
 // calculate avg ratings for display on items
        const reviews  = await ProductReview.find({productId});
        const totalReviewsLength = reviews.length;
        
        const averageReview  = reviews.reduce( (sum,reviewItem) => sum + reviewItem.reviewValue,0) / totalReviewsLength;

        await Product.findByIdAndUpdate(productId ,{averageReview});

        res.status(201).json({
            success : true,
            data : newReview
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error"
        })
    }
}

const getProductReviews = async(req,res) => {
    try{
        const {productId } = req.params;

        const reviews = await ProductReview.find({productId});

        res.status(201).json({
            success : true,
            data : reviews
        })

    } catch(error) {
        console.log(error);
    }
}

module.exports = {addProductReview , getProductReviews};