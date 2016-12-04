var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var formidable = require('formidable')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadImage', function(req, res){
  var form = new formidable.IncomingForm();
  var fileName;
  form.uploadDir = path.join(__dirname, '../public/images');
  form.on('file', function(field, file) {
    fileName = "img"+Date.now()+file.name
    fs.rename(file.path, path.join(form.uploadDir, fileName));
  });
  form.on('error', function(err) {
    res.send({status:'error',msg:"Couldnot Upload"});
  });
  form.on('end', function() {
    res.send({status:'success',fileName:fileName});
  });
  form.parse(req);
});

module.exports = router;
