var test = require('tape');
var mws = require('./');
var mongojs = require('mongojs');
var db = mongojs('test', ['pokemon']);

test('basic test', function(t) {
  var run = function() {
    var mongoStream = mws('test');
    var pokemon = mongoStream('pokemon');
    pokemon.on('finish', function() {
      db.pokemon.find().sort({name: 1}, function(err, pokemon) {
        t.equal(pokemon.length, 3);
        t.equal(pokemon[0].name, 'Charizard');
        t.equal(pokemon[1].name, 'Lapras');
        t.equal(pokemon[2].name, 'Pidegeotto');
        t.end();
        process.exit();
      })
    });

    pokemon.write({name: 'Lapras', type: 'water'});
    pokemon.write({name: 'Pidegeotto', type: 'wind'});
    pokemon.end({name: 'Charizard', type: 'fire'});
  };

  db.pokemon.remove(function(err) {
    t.ok(!err);
    run();
  });
});
