# Hapi Fields

This module adds [partial response][partial-response] support to Hapi.

## Documentation

See [JSON Mask][docs] for the supported syntax.

Options

 * name (String, default: fields): query parameter

## Example

``` javascript
var hapi = require('hapi');

var server = new hapi.Server(8000);

server.route({
  method: 'GET',
  path: '/echo',
  handler: function(request, reply) {
    reply({ hello: 'jane', bye: 'john' });
  },
});

server.pack.register({ plugin: require('hapi-fields') }, function(err) {
  if (err) throw err;
});

server.start();
```

Usage

``` console
$ curl http://127.0.0.1:8000/echo
{"hello":"jane","bye":"john"}
$ curl http://127.0.0.1:8000/echo?fields=hello
{"hello":"jane"}
```

## License

This work is licensed under the MIT License (see the LICENSE file).

[docs]: https://github.com/nemtsov/json-mask#readme
[partial-response]: https://developers.google.com/+/api/#partial-responses
