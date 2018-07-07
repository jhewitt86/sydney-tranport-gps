'use strict';

const transport = require('./nsw-transport-connector');

exports.buses = function(req, res) {

  // Extract the request, and reserve an error variable
  var request = req.body.payload,
      error = false;

  if(error){
    // Request payload missing, return an error object
    res.statusMessage = "There was a problem processing the request. Please check formatting.";
    res.status(400).end();
  }else{
    // The response checks out, send it
    transport.fetchBuses( (response) => {
      res.json(response);
    });
  }
};

exports.trains = function(req, res) {

  // Extract the request, and reserve an error variable
  var request = req.body.payload,
      error = false;

  if(error){
    // Request payload missing, return an error object
    res.statusMessage = "There was a problem processing the request. Please check formatting.";
    res.status(400).end();
  }else{
    // The response checks out, send it
    transport.fetchTrains( (response) => {
      res.json(response);
    });
  }
};

exports.ferries = function(req, res) {

  // Extract the request, and reserve an error variable
  var request = req.body.payload,
      error = false;

  if(error){
    // Request payload missing, return an error object
    res.statusMessage = "There was a problem processing the request. Please check formatting.";
    res.status(400).end();
  }else{
    // The response checks out, send it
    transport.fetchFerries( (response) => {
      res.json(response);
    });
  }
};

exports.deny = function(req, res) {
  res.json({"error":"Please use type POST and include payload."});
};
