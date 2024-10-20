const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const routesAdmin = require("./routes/admin/index.route");
const cors = require("cors");

database.connect();

const app = express();
const port = process.env.PORT;

// parse application/json
app.use(bodyParser.json());

// Đăng ký middleware xử lý upload file
app.use(fileUpload());

//cookie-parser
app.use(cookieParser());

//cors
app.use(cors());

//routes
routesAdmin(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
