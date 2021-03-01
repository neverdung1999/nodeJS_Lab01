const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
   name: {type: 'string', maxLength:255 ,default: ''},
   description: {type: 'string', maxLength:600},
   image: {type: 'string', maxLength:300},
   createAt: {type: Date, default:Date.now},
   updateAt: {type: Date, default:Date.now}
});

module.exports =  mongoose.model('Course', Course);