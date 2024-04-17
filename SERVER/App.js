const express = require('express')
const ErrorHandler = require("./Middleware/Error");
const bodyParser =  require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
//only if static is given , we can access the file
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));

//routes import
const user = require("./Controllers/Users");
app.use("/api/v2", user);


app.use(ErrorHandler);

module.exports = app;