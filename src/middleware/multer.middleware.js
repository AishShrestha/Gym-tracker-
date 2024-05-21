const multer = require("multer");
const path = require("path");

// Define the file filter function
const fileFilter = (req, file, cb) => {
  // Check if the file type is jpg, png, or jpeg
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error("Only jpg, png, or jpeg files are allowed"), false);
  }
};
const filepath = path.join(__dirname, "../../public/temp");
console.log(__dirname);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Inside destination function");
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    console.log("Inside filename function");
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter, // Use the file filter function
});

module.exports = {
  upload,
};
