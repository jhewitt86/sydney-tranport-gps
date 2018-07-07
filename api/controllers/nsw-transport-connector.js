var gtfsrb = require('gtfs-realtime-bindings');
var protobuf = require('protobufjs');
var request = require('request');
var path = require('path');

var url = 'https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/';

module.exports = {
  fetchBuses: (callback) => {
    request({
        url: url + 'buses',
        headers: { 'authorization':'apikey u7JM8ZwnL70qtfDJx6cuIx1PAPeumVdEOuFH' },
        method: 'GET',
        encoding: null
      }, function (error, response, body) {
        // var feed = gtfsrb.FeedMessage.decode(body);
        // var feed = gtfsrb.FeedMessage.decode(new Buffer(body, 'base64'));

        var transit = protobuf.loadProtoFile(path.join(__dirname, "../proto/gtfs-realtime.proto")).build("transit_realtime");
        var feed = transit.FeedMessage.decode(body);
        var results = [];

        for(let vehicle in feed.entity){
          let item = {...feed.entity[vehicle], type: 'bus' }
          results.push(item);
        }

        callback(results);
    });
  },
  fetchTrains: (callback) => {
    request({
        url: url + 'sydneytrains',
        headers: { 'authorization':'apikey u7JM8ZwnL70qtfDJx6cuIx1PAPeumVdEOuFH' },
        method: 'GET',
        encoding: null
      }, function (error, response, body) {

        // var feed = gtfsrb.FeedMessage.decode(body);
        // var feed = gtfsrb.FeedMessage.decode(new Buffer(body, 'base64'));

        var transit = protobuf.loadProtoFile(path.join(__dirname, "../proto/gtfs-realtime.proto")).build("transit_realtime");
        var feed = transit.FeedMessage.decode(body);
        var results = [];

        for(let vehicle in feed.entity){
          let item = {...feed.entity[vehicle], type: 'train' }
          results.push(item);
        }

        callback(results);
    });
  },
  fetchFerries: (callback) => {
    request({
        url: url + 'ferries',
        headers: { 'authorization':'apikey u7JM8ZwnL70qtfDJx6cuIx1PAPeumVdEOuFH' },
        method: 'GET',
        encoding: null
      }, function (error, response, body) {

        // var feed = gtfsrb.FeedMessage.decode(body);
        // var feed = gtfsrb.FeedMessage.decode(new Buffer(body, 'base64'));

        var transit = protobuf.loadProtoFile(path.join(__dirname, "../proto/gtfs-realtime.proto")).build("transit_realtime");
        var feed = transit.FeedMessage.decode(body);
        var results = [];
        var ferries = [];

        for(let vehicle in feed.entity){
          // Check ferry not already handled
          let id = feed.entities[vehicle].vehicle.vehicle.id;
          if(ferries.indexOf(id)!==-1){}else{
            // Push ferry into results
            ferries.push(id);
            let item = {...feed.entity[vehicle], type: 'ferry' }
            results.push(item);
          }
        }

        callback(results);
    });
  }
}
