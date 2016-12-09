var express  = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
var {checkLogin, inserUser, checkUsernameExist} = require('./db.js');
app.use(require('body-parser').urlencoded({extended: false}));

app.listen(3000, () => console.log('Server started'));

app.get('/dangnhap', (req, res) => res.render('home'));

app.post('/xulydangnhap', (req, res) => {
  var {username, password} = req.body;
  checkLogin(username, password, err => {
    if(err){
      return res.send(err);
    }
    res.send('Dang nhap thanh cong');
  });
})

app.get('/dangky', (req, res) => res.render('dangky'));

app.post('/xulydangky', (req, res) => {
  var {username, password, image, phone} = req.body;
  inserUser(username, password, phone, image, err => {
    if(err){
      return res.send(err);
    }
    res.send('Dang ky thanh cong');
  });
});

app.get('/api/checkUsername/:username', (req, res) => {
  checkUsernameExist(req.params.username, err => {
    if(err){
      return res.send(err);
    }
    res.send('Ban co the su dung username nay');
  })
});
