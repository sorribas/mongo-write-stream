mongo-write-stream
==================

Node.js module that creates a writable object stream to a mongodb collection.

```
npm install mongo-write-stream
```

Example.

```js
var mongoWriteStream = require('mongo-write-stream');
var streamDb = mongoWriteStream('mongodb://hostname/mydb');

var collectionStream = streamDb.createWriteStream('collectionName');
someObjectReadableStream.pipe(collectionStream);
```

Instead of a connection string you can also pass a [mongodb native driver](https://github.com/mongodb/node-mongodb-native)
database instance or a [mongojs](https://github.com/mafintosh/mongojs) database instance to avoid duplicate connections.
