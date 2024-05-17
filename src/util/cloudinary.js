const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) return null;

    //  upload file  on cloudinary
    const response = await cloudinary.uploader.upload(localpath, {
      resource_type: "image",
    });
    //  file has been successfully uploaded
    console.log("file has been successfully uploaded", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
module.exports = {
  uploadOnCloudinary,
};
