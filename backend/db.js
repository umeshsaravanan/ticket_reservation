const mongoose = require('mongoose');


require('dotenv').config()

let database;

module.exports = {
    connectToDb: (cb) => {
        mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
            .then(() => {console.log('Database connected successfully')
                return cb();
            })
            .catch(err => {
                console.log('Database connection error:', err)
                return cd(err)
            });
    },
    getDb: () => database
}