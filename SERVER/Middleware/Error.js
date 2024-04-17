const ErrorHandler = require("../Utils/ErrorHandler");
const {TokenExpiredError} = require("jsonwebtoken");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //wrong mongodb id error
if(err.name === 'CastError'){
    const message = `Resource not Found with this id:${err.path}`;
    err = new ErrorHandler(message, 400)
}
//duplicate key error
if(err.code === 11000){
    const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
}
//wrong jwt
if(err.name === 'JsonWebTokenError'){
    const message = "Your URL is invalid";
    err = new ErrorHandler(message, 400);
}

if(err.name === "TokenExpiredError"){
    const message = "Your URL is Expired";
    err = new ErrorHandler(message,400);
}

res.status(err.statusCode).json({
    success: false,
    message: err.message,

});
};