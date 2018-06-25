//setting up the database //
1. Install the postgreSQL database on the developement system
2. Enable the POSTGIS extension for the database so that your database can handle the GIS data
3. upload the shape files of krishna district's police boundary and the police stations points and the tables should be named 
such that the boundaries shapefiles gets the table name of "bounds" and the police points shape file gets the name of "ps_points"
4. Add an extra colmun to the table ps_points so that you can get all the police stations points from the ps_points which belong 
   to the Vijayawada city comissionarate. 
4. Create a function in the database with the name "get_bounds(lat double precision, long double precision)" so that you 
   can get all the GIS features from the database in the form of a GeoJSson.
5. Now install nodejs on to the development system.
6. Then change the configuration ".env" in the root/.env file change the database credentials also you can change the port number if you want to
7. Then if nothing wrong you from the root directory of the project if you open cmd and type "npm start" and hit enter your server should be up
    and running ready to serve.
Not yet done!! go to the frontend folder and there's an another readme file there go read that!!
