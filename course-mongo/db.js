const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbname = "course-internal";
const url = "mongodb://localhost:27017";
const mongoOptions = { useNewUrlParser: true,  useUnifiedTopology: true };

const state  = {
    db: null
};

const connect = (cb) => {
    if (state.db) {
        console.log(cb);
        
        cb();
    } else {
        MongoClient.connect(url,mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            } else {
                state.db = client.db(dbname);
                cb();
            }
        })
    }
}

const getPrimaryKey = (_id) => {
    return ObjectId(_id);
}

const getDb = () => {
    return state.db
}

module.exports = {getDb, connect, getPrimaryKey}