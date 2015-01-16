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
  Measurement.findById(req.params.id, function (err, measurement) {
    if(err) { return handleError(res, err); }
    if(!measurement) { return res.send(404); }
    return res.json(measurement);
  });
};

// Creates a new measurement in the DB.
exports.create = function(req, res) {
  lambda.calculate(req.body);
  Measurement.create(req.body, function(err, measurement) {
    if(err) { return handleError(res, err); }
    return res.json(201, measurement);
  });
};

// Updates an existing measurement in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Measurement.findOne( { "uid" : req.params.id } , function (err, measurement) {
    if (err) { 
      Measurement.create(lambda.calculate(req.body), function(err, measurement) {
        if(err) { return handleError(res, err); }
        return res.json(201, measurement);
      });
    }
    if(!measurement) { return res.send(404); }

    if(req.body.video.lambda) { delete req.body.video.lambda; }
    if(req.body.video.std) { delete req.body.video.std; }
    if(req.body.video.count) { delete req.body.video.count; }
    if(req.body.audio.lambda) { delete req.body.audio.lambda; }
    if(req.body.audio.std) { delete req.body.audio.std; }
    if(req.body.audio.count) { delete req.body.audio.count; }

    var updated = _.merge(measurement, req.body);
    lambda.calculate(update);

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
