var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		min: 0,
		max: 2019,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	// reviews: [reviewSchema]
});

var Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
