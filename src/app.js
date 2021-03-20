'use strict';

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//const router = express.Router();

// carrega as rotas
const indexRoute = require("./routes/index");
const productRoute = require("./routes/products");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
