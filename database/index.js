var pg = require('pg');
var PGDATABASE = 'hackbox';
var PGPASSWORD = 'manuel23';

var config = {
    database:PGDATABASE,
    password: PGPASSWORD,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }
var pool = new pg.Pool(config);
var myClient;
var hi = pool.connect(function (err, client, done) {
    if (err) console.log(err)
    myClient = client
    console.log("Postgres Malone")
})


module.exports = pool;