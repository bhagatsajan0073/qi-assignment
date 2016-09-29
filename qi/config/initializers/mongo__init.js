var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var format = require('string-format');
var sys_confiq ={
    host_environment:'localhost',
    db_port:'27017',
    db_name:'dummy'
};


var mongo_connection_url=format("mongodb://{host_environment}:{db_port}/{db_name}",sys_confiq);
MongoClient.connect(mongo_connection_url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    module.exports=db;
});