"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
  Product.find({active: true},'title price slug')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(400)
        .send(err);
    });
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({slug: req.params.slug, active: true},'title description price slug tags')
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res
          .status(400)
          .send(err);
      });
  };

exports.post = (req, res, next) => {
  var product = new Product(req.body);
  // product.title = req.body.title
  product
    .save()
    .then((el) => {
      res.status(201).send({ message: "Produto codastrado com sucesso" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "Falha ao cadastrar produto", data: err });
    });
};

exports.put = (req, res, next) => {
  const id = req.params.id;
  res.status(200).send({ id: id, items: req.body });
};

exports.delete = (req, res, next) => {
  res.status(201).send(req.body);
};
