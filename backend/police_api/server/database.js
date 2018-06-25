const postgres = require('pg');
const log = require('./logger');
const connectionString = process.env.DATABASE_URL;
var mergeJSON = require("merge-json") ;


// Initialize postgres client
const client = new postgres.Client({ connectionString });
if(client!=null){
  console.log("client creation sucess");
  console.log("client created");

}

// Connect to the DB
client.connect().then(() => {
  log.info(`Connected To ${client.database} at ${client.host}:${client.port}`);
}).catch(log.error)



module.exports = {
  /** Query the current time */
  queryTime: async () => {
    const result = await client.query('SELECT NOW() as now');
    return result.rows[0];

  },
  allstations: async() => {
     const policequery = `  SELECT row_to_json(fc)
     FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
     FROM (SELECT 'Feature' As type
      , ST_AsGeoJSON(lg.geom)::json As geometry
      , row_to_json((SELECT l FROM (SELECT police_sta) As l
        )) As properties
     FROM ps_points As lg   ) As f )  As fc; `
     const result = await client.query(policequery);
     return result.rows[0].row_to_json;
  },

  policestation_bounds: async(latitude,longitude)=>{
    let boundsresult;
    var lat = latitude;
    var longi =longitude;
  const boundquery = `  SELECT row_to_json(fc)
  FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
  FROM (SELECT 'Feature' As type
   , ST_AsGeoJSON(lg.boundary)::json As geometry
   , row_to_json((SELECT l FROM (SELECT police_sta ) As l
     )) As properties
  FROM get_bounds($1,$2) As lg   ) As f )  As fc; `
  const result=await client.query(boundquery,[lat,longi]);
      console.log(result.rows[0].row_to_json);
      return result.rows[0].row_to_json;
 },
  boundstations : async(latitude,longitude) =>{
    let boundsresult;
    var lat = latitude;
    var longi =longitude;
    const pointquery = `  SELECT row_to_json(fc)
    FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
    FROM (SELECT 'Feature' As type
     , ST_AsGeoJSON(lg.pstations)::json As geometry
     , row_to_json((SELECT l FROM (SELECT police_sta) As l
       )) As properties
    FROM get_bounds($1,$2) As lg   ) As f )  As fc; `
    const result=await client.query(pointquery,[lat,longi]);
        console.log(result.rows[0].row_to_json);
        return result.rows[0].row_to_json;
   },
 allbounds: async() => {
   const policequery = `  SELECT row_to_json(fc)
   FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
   FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(lg.geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT police_sta) As l
      )) As properties
   FROM bounds As lg   ) As f )  As fc; `
   const result = await client.query(policequery);
   return result.rows[0].row_to_json;
}
  /*
  SELECT row_to_json(fc)
FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
FROM (SELECT 'Feature' As type
 , ST_AsGeoJSON(lg.geom)::json As geometry
 , row_to_json((SELECT l FROM (SELECT police_sta) As l
   )) As properties
FROM ps_points As lg   ) As f )  As fc;



SELECT ST_AsGeoJSON(geom),police_sta
FROM ps_points;



      */
}
