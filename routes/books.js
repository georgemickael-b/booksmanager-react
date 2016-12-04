var express = require('express');
var router = express.Router();
var Book = require('../model/books')

const MSG_BOOK_ADDED = "Book successfully added."
const MSG_BOOK_DELETED = "Book successfully deleted."
const MSG_BOOK_UPDATED = "Book successfully updated."
const MSG_ERROR_ISBN_EXISTS = "ISBN number already exists."
const MSG_ERROR_INVALID_VALUES = "Invalid values are supplied. Please correct and try again."

isValidValue = function(value){
  if(!value || value=="")
    return false
  return true
}

isValidBook = function(book){
  return isValidValue(book.name) && isValidValue(book.author) && isValidValue(book.ISBN)
}
getError = function(code){
  var msg="Unknown Error."
  if(code==11000)
    msg = MSG_ERROR_ISBN_EXISTS
  return {status:"error",msg:msg}
}

router.get('/count',function(req,res){
  Book.count({}, function(err,count) {
    if(err){
      res.send(getError(err.code))
    }
    else{
      res.send({status:"success",payload:count})
    }
  });
})

router.get('/', function(req, res) {
  console.log(req.query)
  var {i,n} = req.query
  var options = {}
  if(i && n)
    options = {skip:Number(i),limit:Number(n)}

  Book.find({},{},options, function (err, docs) {
    if(err){
      res.send(getError(err.code))
    }
    else{
      res.send({status:"success",payload:docs})
    }
  });
});

router.post('/',function(req,res){
  if(isValidBook(req.body)){
    var {name,author,ISBN,imgSrc} = req.body
    var book = new Book({
      name : name,
      author : author,
      ISBN : ISBN,
      imgSrc : imgSrc
    })
    book.save(function(err){
      if(err)
        res.send(getError(err.code))
      else
        res.send({status:"success",msg:MSG_BOOK_ADDED})
    })
  }
  else{
    res.send({status:"invalid",msg:MSG_ERROR_INVALID_VALUES})
  }
})

router.delete('/',function(req,res){
  var {ISBN} = req.body
  console.log(req.body)
  if(!isValidValue(ISBN))
    res.send({status:"invalid",msg:MSG_ERROR_INVALID_VALUES})
  else
    Book.findOneAndRemove({ISBN : ISBN },function(err){
      if(err)
        res.send(getError(err.code))
      else
        res.send({status:"success",msg:MSG_BOOK_DELETED})
    })
})

router.put('/',function(req,res){ // For updating we will use _id as key coz ISBN could be changed too.
  var {_id} = req.body
  var update = {}
  for(key in req.body){
    if(key=='_id')
      continue
    if(isValidValue(req.body[key]))
      update[key]=req.body[key]
    else{
      res.send({status:"invalid",msg:MSG_ERROR_INVALID_VALUES})
      return
    }
  }

  Book.update({_id:_id},update,{},function(err){
    if(err)
      res.send(getError(err.code))
    else
      res.send({status:"success",msg:MSG_BOOK_UPDATED})
  })
})

module.exports = router
