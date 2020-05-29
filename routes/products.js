
var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  var query = 'select * from products';
  db.query(query, function(err, rows, fields) {
    if (err) throw err;
    //res.json(rows);
    res.render('products', { title: 'Products', products: rows});
  })
});



/*create */
router.get('/create-form', function(req, res, next) {
  res.render('create', {title: 'Create Contact'});
});

router.post('/create', function(req, res, next) {
  const phono=req.body.phono;
  const name=req.body.name;
  const dob=req.body.dob;
  const email=req.body.email;
  var records = [[name,phono,email,dob]];

  var sql = "INSERT INTO products (name , phono, email, dob) VALUES ?";
  db.query(sql,[records], function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('/products');
  });
});

/*update */
router.get('/edit-form/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM products WHERE id=${id}`;
  db.query(sql, function(err, rows, fields) {
      res.render('edit', {title: 'Edit Product', product: rows[0]});
  });
});

router.post('/edit/:id', function(req, res, next) {
    const phono=req.body.phono;
    const name=req.body.name;
    const dob=req.body.dob;
    const email=req.body.email;
    var id = req.params.id;
    var records = [[name,phono,email,dob]];
  
  var sql = `UPDATE products SET name="${name}",email="${email}", phono="${phono}", dob="${dob}" WHERE id=${id}`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record updated!');
    res.redirect('/products');
  });
});

/*delete */
router.get('/delete/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  var sql = `DELETE FROM products WHERE id=${id}`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record deleted!');
    res.redirect('/products');
  });
});


/*search */
router.get('/search', function(req, res, next) {
  res.render('search', {title: 'Results'});
});

router.post('/search', function(req, res, next) {
  const word=req.body.word;

  var sql = "SELECT * FROM products WHERE name like 'word%'";
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log(sql);
  });
});


module.exports = router;

