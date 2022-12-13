const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/index");
const { ValidationError } = require("express-validation");
const bodyParser = require("body-parser");
const userRouter = require("./src/apis/router/user.router");
const productRouter = require("./src/apis/router/product.router");
const orderRouter = require("./src/apis/router/order.router");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use("/v1/api", userRouter);
app.use("/v1/api/product", productRouter);
app.use("/v1/api/order", orderRouter);

db.sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to SQL Database 📅📅`);

    db.sequelize.sync({
      logging: false,
      force: false,
    });
  })
  .catch((error) => {
    console.log(`⛔⛔ Unable to connet to SQL Database ⛔⛔`, error.message);
  });

//for validating api req params
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    if (
      err.details &&
      err.details.body &&
      err.details.body.length &&
      err.details.body[0].message
    ) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.details.body[0].message.replace(/"/g, ""),
      });
    } else {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        response: err,
      });
    }
  }

  return res.status(500).json(err);
});

app.use("/", function (req, res) {
  res.statusCode = 200;
  res.json({ success: false, message: "Invalid url", data: null });
});

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`🚲🚲🚲 server listed on ${port}`);
});
