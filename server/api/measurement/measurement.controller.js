/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /measurements              ->  index
 * POST    /measurements              ->  create
 * GET     /measurements/:id          ->  show
 * PUT     /measurements/:id          ->  update
 * DELETE  /measurements/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Measurement = require('./measurement.model');
var lambda = require('./lambda');

// Get list of measurements
exports.index = function(req, res) {
  Measurement.find(function (err, measurements) {
    if(err) { return handleError(res, err); }
    return res.json(200, measurements);
  });
};

// Get a single measurement
exports.show = function(req, res) {
  Measurement.findOne( { "uid" : req.params.id } , function (err, measurement) {
    if(err) { return handleError(res, err); }
    if(!measurement) { return res.send(404); }
    return res.json(measurement);
  });
};

// Creates a new measurement in the DB.
var create = function(req, res) {
  
  req.body.video = lambda.calculate( req.body.video ? req.body.video : {} );
  req.body.audio = lambda.calculate( req.body.audio ? req.body.audio : {} );
  Measurement.create(req.body, function(err, measurement) {
    if(err) { return handleError(res, err); }
    return res.json(201, measurement);
  });
};

exports.create = create;


// Updates an existing measurement in the DB.
exports.updateX = function(req, res) {

  if(req.body._id) { delete req.body._id; } // from original code generation

  Measurement.findOne( { "uid" : req.params.id } , function (err, measurement) {
    if (err || !measurement) {
      return create(req, res);
    }

    var newitem = { };
    var updated = { };
    if ( req.body.name ) { 
	newitem = {
		name : ( req.body ? req.body.name : "" )
	};
    	updated = _.merge(measurement, newitem); // from original code generation
    } else {
	newitem = {
		video : { data : req.body.video ? ( req.body.video.data ? req.body.video.data : measurement.video.data ) : measurement.video.data } ,
		audio : { data : req.body.audio ? ( req.body.audio.data ? req.body.audio.data : measurement.audio.data ) : measurement.audio.data } 
   	};
    	updated = _.merge(measurement, newitem); // from original code generation
    	if ( req.body.name ) {
	  console.log( "lambda.calculate(updated.video);" );
    	  lambda.calculate(updated.video);
    	  console.log( "lambda.calculate(updated.audio);" );
    	  lambda.calculate(updated.audio);
    	}
    }

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, measurement);
    });
  });
};

exports.update = function(req, res) {

  if(req.body._id) { delete req.body._id; } // from original code generation

  Measurement.findOne( { "uid" : req.params.id } , function (err, measurement) {
    if (err || !measurement) {
      return create(req, res);
    }

	var updated = measurement;
    if ( req.body.name ) { 
	updated.name = req.body.name;
    } else {
	if (req.body.video) {
		updated.video.data = req.body.video.data;
	}
	if (req.body.audio) {
		updated.audio.data = req.body.audio.data;
	}

    	  console.log( "lambda.calculate(updated.video);" );
    	  lambda.calculate(updated.video);
    	  console.log( "lambda.calculate(updated.audio);" );
    	  lambda.calculate(updated.audio);
    }

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, measurement);
    });
  });
};


// Deletes a measurement from the DB.
exports.destroy = function(req, res) {
  Measurement.findById(req.params.id, function (err, measurement) {
    if(err) { return handleError(res, err); }
    if(!measurement) { return res.send(404); }
    measurement.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
