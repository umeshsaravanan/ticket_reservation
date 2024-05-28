const { MongoClient } = require('mongodb')
require('dotenv').config()

let database;

module.exports = {
    connectToDb: (cb)=>{
        MongoClient.connect(process.env.DB_URI)
        .then((client)=>{
            database = client.db();
            return cb();
        })
        .catch(err=>{
            console.log(err);
            return cb(err);
        })
    },
    getDb : () => database
}