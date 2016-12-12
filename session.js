var session = require('express-session');
var sess = session({
  secret: 'j^gYTF^3278O((7))',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 10000}
});

var mang = ['/','/dangnhap', '/dangky', '/xulydangnhap', '/xulydangky'];


var middle = (req, res, next) => {
  if(req.session.daDangNhap || (mang.indexOf(req.path) != -1) || (req.path.indexOf('/api/checkUsername/')) != -1){
    next();
  }else{
    res.redirect('/');
  }
}

module.exports = {sess, middle};
