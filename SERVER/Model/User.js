const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");






const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
    },
    email:{
        type:String,
        required: [true, "please enter your email"],
    },
    password:{
        type:String,
        required: [true, "please enter your password"],
        minLength: [5, "password should be greater than 5 characters"],
        select: false,
    },
    phoneNumber:{
        type: Number,
    },
    address:[
        {
            country:{
                type:String,
            },
            city:{
                type:String,
            },
            address1:{
                type:String,
            },
            address2:{
                type:String,
            },
            zipCode:{
                type:String,
            },
        },
    ],
    role:{
        type: String,
        default: "user",
    },
    avatar: {
        public_id:{
            type: String,
            required: false,
        },
        url:{
            type: String,
            required: false,

        },
    },
    createrAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});

module.exports = mongoose.model("User", userSchema);
//md5 sha25 - algorithms used to encrypt the key