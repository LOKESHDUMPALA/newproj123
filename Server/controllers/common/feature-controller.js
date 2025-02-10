
const Feature = require("../../models/Feature");

const addFeatureImage = async(req , res) => {
    try{
         
        const {image} = req.body;
        const featureImages = new Feature({
            image
        })

        await featureImages.save();

        res.status(200).json({
            success: true,
            data : featureImages
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: "error"
        })
    }
}

const getFeatureImages = async(req,res) => {
    try{
        
        const images  = await Feature.find({});
        console.log(images,"img");
        res.status(200).json({
            success : true,
            data : images
        })

    } catch(error){
        res.status(500).json({
            success: false,
            message: "error"
        })
    }
}


module.exports ={addFeatureImage , getFeatureImages};