'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mongodb-server-project';

// Placeholder for db client
var db;

const insertDocuments = function(data, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany(data, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

const findAllDocuments = function(callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

const findDocuments = function(data,callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find(data).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

const updateDocument = function(entry,data,callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne(entry
    , { $set: data }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });
}

const removeDocument = function(data,callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document matching data
  collection.deleteOne(data, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });
}

const indexCollection = function(data,callback) {
  db.collection('documents').createIndex(
    data,
      null,
      function(err, results) {
        callback(results);
    }
  );
};

module.exports = {

  start: (callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);

      console.log("Connected successfully to server");

      db = client.db(dbName);

      if(callback){
        callback();
      }
    });
  },

  getAll: (callback) => {
    findAllDocuments( (results) => {
      if(callback){
        callback(results);
      }
    });
  },

  find: (data,callback) => {
    // Data a single object, e.g. {name: "Bob"}
    findDocuments(data, (results) => {
      if(callback){
        callback(results);
      }
    });
  },

  update: (entry,data,callback) => {
    // Entry and data both a single object, e.g. {name: "Bob"}
    updateDocument(entry,data, (results) => {
      if(callback){
        callback(results);
      }
    });
  },

  add: (data,callback) => {
    // Data an array of objects, e.g. [{name: "Bob"}]
    insertDocuments(data, (results) => {
      if(callback){
        callback(results);
      }
    });
  },

  remove: (data,callback) => {
    // Data a single object, e.g. {name: "Bob"}
    removeDocument(data,(response) => {
      if(callback){
        callback(response);
      }
    });
  },

  index: (data,callback) => {
    // Data a single object, e.g. {name: "Bob"}
    indexCollection(data, (response) => {
      if(callback){
        callback(response);
      }
    });
  }
}
