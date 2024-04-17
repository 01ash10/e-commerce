const express = require('express');
const router = express.Router();
const User = require("../Model/User");
const {upload} = require("../multer");
const ErrorHandler = require('../Utils/ErrorHandler');
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require('url');
const sendMail = require("../Utils/sendMail");
const jwt=require("jsonwebtoken")

router.post('/create-user',
upload.single("file"),
async(req,res,next) => {

try {
    const { name, email,password} = req.body;
    const userEmail = await User.findOne({ email});
    if(userEmail){
        const fileName = req.file.filename;
        // const fileUrl = path.join(filename);
    const filePath = `uploads/${fileName}`;
        
        // return next(new ErrorHandler("User already exists", 400));
        //unlink = remove
    fs.unlink(filePath, (err) => {
        if(err){
            console.log(err);
            res.status(500).json({message:"Error Deleting file"});

        }else {
            res.json({message: "File deleted successfully"})
        }
    });
    return next(new ErrorHandler("user already exists", 400));

    }
    const fileName = req.file.filename;
    console.log(fileName);
    const fileUrl = path.join(fileName);
    console.log(fileUrl);
  

    const user = 
        { name,
         email,
        password: password,
        avatar: {
            public_id:fileURLToPath,
            url: fileURLToPath,
        },
    };

    
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    //send mail
    
    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name} please click on the link to activate your account: ${activationUrl}`,
      });
      res
        .status(201)
        .json({
          success: true,
          message: `please check your mail ${user.email}`,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }}
      catch(error) {
        return next(new ErrorHandler(error.message, 400));
      }
  
      // const newUser = await User.create(user);
      // res.status(201).json({ success: true, data: newUser });
    } 
  );
  
  //function to create activation token

  const createActivationToken = (user) => {
    return (jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    }));
  };
  

  //----------------------------------------------------------------------------------------------------  
    // const activaton = createAcivationToken(user);

    // const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    // console.log(user);
    // res.status(201).json({success: true, newUser});


//  const newUser = await User.create(user);
//  res.status(201).json({success: true, newUser});


module.exports = router;