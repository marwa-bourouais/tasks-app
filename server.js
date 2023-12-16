const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// a route for home page
app.get("/home", (req, res) => {
  res.json({ message: "NodeJs Tasks Application" });
});

// setting port to 3000, & listening for requests http request.
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

require("./app/routes/tasks.routes.js")(app);
require("./app/cron-job/cron-job.js")();
