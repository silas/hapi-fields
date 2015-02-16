'use strict';

/**
 * Module dependencies.
 */

var expect = require('code').expect;
var hapi = require('hapi');

/**
 * Lab.
 */

var lab = exports.lab = require('lab').script();

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
        expect(request.query).not.to.include('fields');

        reply({ hello: 'jane', bye: 'john' });
      },
    });

    server.register({ register: require('..') }, done);
  });

  lab.test('return full response', function(done) {
    server.inject('/', function(res) {

      expect(res.result).to.deep.equal({
        hello: 'jane',
        bye: 'john',
      });

      done();
    });
  });

  lab.test('return full response with extra query parameters', function(done) {
    server.inject('/?one=two', function(res) {

      expect(res.result).to.deep.equal({
        hello: 'jane',
        bye: 'john',
      });

      done();
    });
  });

  lab.test('return partial response', function(done) {
    server.inject('/?one=two&fields=hello', function(res) {

      expect(res.result).to.deep.equal({
        hello: 'jane',
      });

      done();
    });
  });
});
