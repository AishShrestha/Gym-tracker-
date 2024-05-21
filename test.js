const fs = require("fs");

const checkFilePermissions = (filePath) => {
  fs.access(
    filePath,
    fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
    (err) => {
      if (err) {
        console.error("File is not accessible:", err);
        return;
      }
      console.log("File is accessible");
    }
  );
};

// Replace "path/to/your/file" with the actual path of the file you want to check
const filePath = "./storage/profile-pictures";

checkFilePermissions(filePath);
