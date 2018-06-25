const express = require('express');
const cors = require('cors');
const log = require('./logger');
const api = require('./api');




//SETUP EXPRESS SERVER
const app = express();
const port =process.env.PORT || 5000;

// Mount routes
app.use('/',api);

//apply cors config
const origin = process.env.CORS_ORIGIN | '*';
app.use(cors({ origin }));





   // Log all requests
app.use(async (req,res, next) => {
  const start = Date.now();
  await next() ;// This will pause this function until the endpoint handler has resolved
  const responseTime = Date.now() - start;
  log.info(`${req.method} ${req.status} ${req.url} - ${responseTime} ms`);

});




// Error Handler - All uncaught exceptions will percolate up to here
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    log.error(`Request Error ${ctx.url} - ${err.message}`);
  }
});


// Start the app
app.listen(port, () => { log.info(`Server listening at port ${port}`) });
