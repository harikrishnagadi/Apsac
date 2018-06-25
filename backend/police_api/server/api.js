const express = require('express');
var router =express.Router();
const database = require('./database');
const log = require('./logger');

// add your routes here

router.get('/hello',function(req,res){
  var body = req.
 res.end("hello brother !!");
});



// Get time from DB
router.get('/time', async function(req,res){
  var result = await database.queryTime();
  res.send(JSON.stringify(result));

});



// get police stations from DB
router.get('/boundsta/:lat/:long',async function(req,res){
    //console.log("lat is "+req.params.lat);
    //console.log("long is"+req.params.long);
    const result = await database.policestation_bounds(req.params.lat,req.params.long);
    console.log("result is"+result);
    // Add row metadata as geojson properties
//  const boundaries = ((result) => {
  //  let geojson =JSON.parse(result.row_to_json)
//    return geojson
 //});
  res.send(result);
});


//get boundaries from BD
router.get('/jurisboundaries/:lat/:long',async function(req,res){
    const result = await database.policestation_bounds(req.params.lat,req.params.long);
    res.send(result);
});

//get boundpoints from BD
router.get('/jurisstations/:lat/:long',async function(req,res){
    const result = await database.boundstations(req.params.lat,req.params.long);
    res.send(result);
});

router.get('/allboundaries',async function(req,res){
    const result = await database.allbounds();
    res.send(result);
});

router.get('/allstations',async function(req,res){
      const result = await database.allstations();
      res.send(result);
})


module.exports = router;
