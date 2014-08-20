var mongojs = require('mongojs');
var stream = require('stream');

var create = function(conn) {
  var db = mongojs(conn);

  return function(colName) {
    var collection = db.collection(colName);
    var strm = new stream.Writable({objectMode: true, highWaterMark: 16});
    strm._write = function(obj, enc, cb) {
      collection.insert(obj, cb);
    };

    strm.destroy = function() {
      this.emit('close');
    };

    return strm;
  };
};

module.exports = create;
