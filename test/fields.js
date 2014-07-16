'use strict';

/**
 * Module dependencies.
 */

var hapi = require('hapi');
var lab = require('lab');

/**
 * Plugin.
 */

lab.experiment('fields', function() {
  var server;

  lab.before(function(done) {
    server = new hapi.Server();

    server.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        lab.expect(request.query).to.eql({
          one: 'two',
        });

        reply({
          hello: 'jane',
          bye: 'john',
        });
      },
    });

    server.pack.register({ plugin: require('..') }, done);
  });

  lab.test('return full response', function(done) {
    server.inject('/', function(res) {

      lab.expect(res.result).to.eql({
        hello: 'jane',
        bye: 'john',
      });

      done();
    });
  });

  lab.test('return full response with extra query parameters', function(done) {
    server.inject('/?one=two', function(res) {

      lab.expect(res.result).to.eql({
        hello: 'jane',
        bye: 'john',
      });

      done();
    });
  });

  lab.test('return partial response', function(done) {
    server.inject('/?one=two&fields=hello', function(res) {

      lab.expect(res.result).to.eql({
        hello: 'jane',
      });

      done();
    });
  });
});
