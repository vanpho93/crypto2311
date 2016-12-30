var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, "./public/images/hinhdaidien");
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
});

function fileFilter(req, file, cb){
  if(file.mimetype=="image/jpeg"){
    console.log('Sai dinh dang');
    cb(null, true);
  }else{
    cb(new Error("Sai dinh dang file"));
    console.log('Sai dinh dang');
  }
}

var limits = {
  fileSize: 1024*500
}

// var upload = multer({storage, fileFilter, limits}).single('avatar');

function getUpload(fieldname){
  return multer({storage}).single(fieldname);
}

function getArrayUpload(fieldname){
  return multer({storage}).array(fieldname);
}

module.exports = {getUpload, getArrayUpload};
