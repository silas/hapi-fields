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

  server.ext('onPostAuth', function(request, next) {
    if (request.query && request.query.hasOwnProperty(options.name)) {
      request._fields = request.query[options.name];
      delete request.query[options.name];
    }

    next();
  });

  server.ext('onPreResponse', function(request, next) {
    if (request._fields && request.response.variety === 'plain' && request.response.source) {
      request.response.source = mask(request.response.source, request._fields);
    }

    next();
  });

  next();
}

/**
 * Attributes.
 */

register.attributes = {
  pkg: require('./package.json'),
};

/**
 * Module exports.
 */

exports.register = register;
