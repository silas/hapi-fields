'use strict';

/**
 * Module dependencies.
 */

var hapi = require('hapi');

/**
 * Lab.
 */

var lab = exports.lab = require('lab').script();
var expect = require('lab').expect;

/**
 * Plugin.
 */

lab.experiment('fields', function() {
  var server;

  lab.before(function(done) {
    server = new hapi.Server();
    server.connection();

    server.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        expect(request.query).not.to.have.property('fields');

        reply({ hello: 'jane', bye: 'john' });
      },
    });

    server.register({ register: require('..') }, done);
  });

  lab.test('return full response', function(done) {
    server.inject('/', function(res) {

      expect(res.result).to.eql({
        hello: 'jane',
        bye: 'john',
      });

      done();
    });
  });

  lab.test('return full response with extra query parameters', function(done) {
    server.inject('/?one=two', function(res) {

      expect(res.result).to.eql({
        hello: 'jane',
        bye: 'john',
      });

      done();
    });
  });

  lab.test('return partial response', function(done) {
    server.inject('/?one=two&fields=hello', function(res) {

      expect(res.result).to.eql({
        hello: 'jane',
      });

      done();
    });
  });
});
