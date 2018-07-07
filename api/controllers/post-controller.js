'use strict';

exports.post = function(req, res) {

  // Extract the request, prepare a response container, and reserve an error variable
  var request = req.body.payload,
      response = {
        response: []
      },
      error = false;

  // Check the request is present
  if(request){

  }else{
    // If an error was encountered, set the error var to true
    error = true;
  }

  if(error){
    // Request payload missing, return an error object
    res.statusMessage = "There was a problem processing the request. Please check formatting.";
    res.status(400).end();
  }else{
    // The response checks out, send it
    res.json(response);
  }
};

exports.deny = function(req, res) {
  res.json({"error":"Please use type POST and include payload."});
};
