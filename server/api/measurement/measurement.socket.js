/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var measurement = require('./measurement.model');

exports.register = function(socket) {
  measurement.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  measurement.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('measurement:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('measurement:remove', doc);
}
