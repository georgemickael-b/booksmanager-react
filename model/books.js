var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  name: String,
  author : String,
  ISBN : {type : String, unique : true},
  imgSrc : {type: String , default : "images/default.jpg"}
},{
  collection : "books"
});
module.exports = mongoose.model('Book', bookSchema);
