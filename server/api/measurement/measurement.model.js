'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeasurementSchema = new Schema({
  uid: String,
  video : {
	data : Number,
	lambda : Number,
	std : Number
  },
  audio : {
	data : Number,
	lambda : Number,
	std : Number
  },
  active: Boolean
});

module.exports = mongoose.model('Measurement', MeasurementSchema);
