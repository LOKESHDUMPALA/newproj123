const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dyxmqzgvk",
  api_key: "519392953861527",
  api_secret: "YKPvmTeG7rW_4aj3a-IBEl6AmXE",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}


const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
