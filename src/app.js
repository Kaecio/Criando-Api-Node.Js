'use strict';

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const router = express.Router();

// Conectando ao banco
mongoose.connect("mongodb+srv://kaecio:123@cluster0.5gmzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser:true});

// carrega os models
const Product = require("./model/product");
const Customer = require("./model/customer");

// carrega as rotas
const indexRoute = require("./routes/index");
const productRoute = require("./routes/products");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
