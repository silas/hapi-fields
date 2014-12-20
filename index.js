'use strict';

/**
 * Module dependencies.
 */

var mask = require('json-mask');

/**
 * Plugin.
 */

function register(server, options, next) {
  var options = options || {};

  options.name = options.name || 'fields';

  server.ext('onPostAuth', function(request, reply) {
    if (request.query && request.query.hasOwnProperty(options.name)) {
      request._fields = request.query[options.name];
      delete request.query[options.name];
    }

    reply.continue();
  });

  server.ext('onPreResponse', function(request, reply) {
    if (request._fields && request.response.variety === 'plain' && request.response.source) {
      request.response.source = mask(request.response.source, request._fields);
    }

    reply.continue();
  });

  next();
}

/**
 * Attributes.
 */

register.attributes = {
  pkg: require('./package.json'),
  name: 'hapi-fields',
};

/**
 * Module exports.
 */

exports.register = register;
