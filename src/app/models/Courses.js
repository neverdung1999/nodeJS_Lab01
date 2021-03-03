const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema({
   name: {type: 'string', maxLength:255 , required: true},
   description: {type: 'string'},
   img: {type: 'string'},
   slug: {type: 'string'},
   videoId: {type: 'string'},
   title:{type: 'string'},
   slug:{type: 'string', slug:'name'}
}, {
   timestamps : true
});

//add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
   deletedAt : true,
   overrideMethods: 'all', 
});

module.exports =  mongoose.model('Course', Course);