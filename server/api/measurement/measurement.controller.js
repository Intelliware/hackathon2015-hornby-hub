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
	req.body.name = req.body.name + " Buddy";
  Measurement.create(req.body, function(err, measurement) {
    if(err) { return handleError(res, err); }
    return res.json(201, measurement);
  });
};

// Updates an existing measurement in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Measurement.findById(req.params.id, function (err, measurement) {
    if (err) { return handleError(res, err); }
    if(!measurement) { return res.send(404); }
    var updated = _.merge(measurement, req.body);
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