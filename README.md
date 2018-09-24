# Lunch Booking

Frontend is a React app, started using Create React App.
Backend is a node.js Express server connecting to a MySQL database.

To get up and running:

If you have docker-compose installed it should be as simple as...

`docker-compose up -d`

and then runghit

`docker-compose run db mysql -h db -u docker -pdocker docker < server/lunch_booking_system_dump.sql`

to populate the database.

You may then need to run `docker-compose restart` to restart the server after MySQL is loaded.

It should be possible to `cd` into frontend and server. In there run `yarn` to install all packages and then `yarn start` to start both applications. You will need to set up and create a MySQL database and change the connection settings in `server/index.js` before loading the sql dump as above.

Once the application is running, visit http://localhost:3000 in your browser.