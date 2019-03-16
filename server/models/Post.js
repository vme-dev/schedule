var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({ 
	start: Number,
	duration:Number,
	title:String
});

var postSchema = new Schema({
	name: {
		type:String,
		dafault:"USER"
	},
	event: {
	    type: [EventSchema],
	    default: undefined
  	}
	
});

module.exports = mongoose.model('users',postSchema);