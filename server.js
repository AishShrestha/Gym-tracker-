const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 9000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
