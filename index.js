const express = require("express");
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routesAdmin = require("./routes/admin/index.route");
const cors = require("cors");
require("dotenv").config();

database.connect();

const app = express();
const port = process.env.PORT;

// parse application/json
app.use(bodyParser.json());

//cookie-parser
app.use(cookieParser());

//cors
app.use(cors());

//routes
routesAdmin(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
