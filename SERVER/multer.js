const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "uploads/");

    },
    filename: function(req, file, cb){
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()* 1E9);
const filename = file.originalname.split(".")[0];
//suith.png - [suith].[png] - [0][1]
cb(null, filename + "-" + uniqueSuffix + ".png");
    },
});

exports.upload = multer({ storage: storage});
//cb - impurefile provided by multer itself
