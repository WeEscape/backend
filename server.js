const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./src/models/index");
const router = require("./src/router");
// const morgan = require('morgan')
const morgan = require('morgan');
const verifyToken = require('./src/middleware/verifyJwt');
const app = express();
const port = process.env.PORT || 8080;

// Set CORS option
app.use(cors());
app.use(morgan('dev'));

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// jwt middleware
app.use(verifyToken);

app.use("/", router);


// RESTful API route for DB
// app.use('/', require('./src/mysql/router/route.ts'));

sequelize
  .sync({ force: false ,  alter: false})
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });

const dotenv = require("dotenv").config();

// console.log(process.env);

app.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-console
    console.log("Production Mode");
  } else if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("Development Mode");
  }
  // eslint-disable-next-line no-console
  console.log("dobby's project");
});
