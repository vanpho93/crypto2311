var express  = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.static('public'));
var {checkLogin, inserUser, checkUsernameExist, getUser, updateUser} = require('./db.js');

var {middle, sess} = require('./session.js');
app.use(sess);
app.use(middle);

app.get('/', (req, res) => res.render('home'))

app.use(require('body-parser').urlencoded({extended: false}));

app.listen(3000, () => console.log('Server started'));

app.get('/giaodich', (req, res) => res.render('giaodich'));

app.get('/dangnhap', (req, res) => {
  if(req.session.daDangNhap){
    return res.redirect('/giaodich');
  }
  res.render('dangnhap');
});

app.post('/xulydangnhap', (req, res) => {
  var {username, password} = req.body;
  checkLogin(username, password, err => {
    if(err){
      return res.send(err);
    }
    req.session.daDangNhap = 1;
    req.session.username = username;
    res.redirect('giaodich');
  });
})

app.get('/dangky', (req, res) => res.render('dangky'));

var upload = require('./upload.js').getUpload('avatar');

app.post('/xulydangky', (req, res) => {
  upload(req, res, err => {
    var {username, password, phone} = req.body;
    var image = req.file.filename;
    inserUser(username, password, phone, image, err => {
      if(err){
        return res.send(err);
      }
      res.send('Dang ky thanh cong');
    });
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

app.get('/profile', (req, res) => {
  getUser(req.session.username, (err, result) => {
    res.render('profile', {result});
  });
});

app.post('/xulyupdate', (req, res) => {
  upload(req, res, err => {
    var {username} = req.session;
    var {password, phone} = req.body;
    var image = req.file.filename;
    updateUser(username, phone, image, password, result => res.send('Cap nhat thanh cong'));
  });
});
