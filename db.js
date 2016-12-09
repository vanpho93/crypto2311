var pg = require('pg');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  database: 'EmployeeDB',
  max: 100,
  idleTimeoutMillis: 1000
}
var pool = new pg.Pool(config);
var {encrypt, decrypt} = require('./crypto.js');

function queryDB(sql, cb){
  var loi, kq;
  pool.connect((err, client, done) => {
    if(err){
      loi = 'Loi ket noi :: ' + err;
      return cb(loi, kq);
    }
    client.query(sql, (err, result) => {
      if(err){
        loi = 'Loi truy van :: ' + err;
        return cb(loi, kq);
      }
      kq = result;
      cb(loi, kq);
    });
  });
}

function inserUser(username, password, phone, image, cb) {
  var loi;
  sql = `INSERT INTO "User"(username, password, phone, image)
        VALUES ('${username}', '${encrypt(password)}', '${phone}', '${image}')`;
  queryDB(sql, (err, result) => {
    if(err){
      loi = err;
      return cb(loi);
    }
    return cb(loi);
  });
}

function checkLogin(username, password, cb){
  var loi;
  var sql = `SELECT * FROM "User" WHERE username = '${username}'`;
  queryDB(sql, (err, result) => {
    if(err){
      loi = err;
      return cb(loi);
    }
    if(result.rows[0]){
      var dePass = decrypt(result.rows[0].password);
      if(password == dePass){
        return cb(loi);
      }
      loi = 'Sai password';
      return cb(loi);
    }
    loi = 'Username khong ton tai';
    cb(loi);
  });
}

checkLogin('abcd', '12344', err => {
  if(err){
    return console.log(err);
  }
  console.log('Thanh cong');
});

// inserUser('abcd', '1234', '09213733', '4.jpg', err => {
//     if(err){
//       return console.log(err);
//     }
//     return console.log('Thanh cong');
// });
// queryDB('SELECT * FROM "User"', (err, result) => {
//   if(err){
//     return console.log(err);
//   }
//   return console.log(result.rows);
// });
