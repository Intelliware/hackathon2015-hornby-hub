'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeasurementSchema = new Schema({
  uid: String,
  video : {
	data : Number,
	count : Number,
	lambda : Number,
	std : Number,
	activity : Number
  },
  audio : {
	data : Number,
	count : Number,
	lambda : Number,
	std : Number,
	activity : Number
  },
  active: Boolean
});

module.exports = mongoose.model('Measurement', MeasurementSchema);
