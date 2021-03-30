'use strict';

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config")

const router = express.Router();

// Conectando ao banco
mongoose.connect(config.connectionString, { useNewUrlParser:true});

// carrega os models
const Product = require("./model/product");
const Customer = require("./model/customer");
const Order = require("./model/order");

// carrega as rotas
const indexRoute = require("./routes/index");
const productRoute = require("./routes/products");
const customerRoute = require('./routes/customer');
const orderRoute = require("./routes/order");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/product", productRoute);
app.use("/customer", customerRoute);
app.use("/orders", orderRoute);

module.exports = app;
