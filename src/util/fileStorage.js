const fs = require("fs");
const path = require("path");

const uploadToLocalFolder = async (localPath) => {
  try {
    if (!localPath) return null;

    // Read the file from local path
    const fileData = fs.readFileSync(localPath);

    const destinationDirectory = path.join(__dirname, "../../storage");

    // Create the "storage" directory if it doesn't exist
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory);
    }

    // Generate a unique file name
    const fileName = `${Date.now()}-${path.basename(localPath)}`;

    // Define the destination path
    const destinationPath = path.join(destinationDirectory, fileName);

    // Write the file to the destination directory
    fs.writeFileSync(destinationPath, fileData);

    console.log("File has been successfully saved to:", destinationPath);

    // Return the path where the file is saved
    return destinationPath;
  } catch (error) {
    console.error("Error saving file:", error);
    return null;
  }
};

module.exports = {
  uploadToLocalFolder,
};
