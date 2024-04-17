class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
//to capture the error in a stack
        Error.captureStackTrace(this,this.constructor);
        //this - in this stack - parent class
   //this.constructor - is the error which has to br handled
    }
}

module.exports =  ErrorHandler;