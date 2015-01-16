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


var update = function(req, res) {
  console.log("RECEIVED : " + JSON.stringify(req.body) );

  if(req.body._id) { delete req.body._id; } // from original code generation
  if(req.body.__v) { delete req.body.__v; } // from original code generation

  Measurement.findOne( { "uid" : req.params.id } , function (err, measurement) {
    if (err || !measurement) {
      return create(req, res);
    }

    if ( req.body.name ) { 
	measurement.name = req.body.name;
    } else {
	measurement.video = measurement.video || {};
	measurement.audio = measurement.audio || {};
	if (req.body.video) {
		measurement.video.data = req.body.video.data || 0;
    	  console.log( "lambda.calculate(updated.video);" );
    	  	lambda.calculate(measurement.video);
	}
	if (req.body.audio) {
		measurement.audio.data = req.body.audio.data || 0;
    	  console.log( "lambda.calculate(updated.audio);" );
    	  	lambda.calculate(measurement.audio);
	}

    }

    measurement.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, measurement);
    });
  });
};

//console.log( update( { params : { id : "123" } , body :  {"uid":"123","video":{"data":27036},"audio":{}} } ) );

exports.update = update;

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
  console.log( "ERROR :: " + JSON.stringify(err) );
  return res.send(500, err);
}
