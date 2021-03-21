"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

// traz tudo filtrando pelos "title price slug"
exports.get = (req, res, next) => {
  Product.find({ active: true }, "title price slug")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// traz pelo slug
exports.getBySlug = (req, res, next) => {
  Product.findOne(
    { slug: req.params.slug, active: true },
    "title description price slug tags"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// traz pelo id
exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// traz pela tag
exports.getByTag = (req, res, next) => {
  Product.find({ tags: req.params.tag, actitive: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// inserir dados
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

// atualiza o produto
exports.put = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug,
    },
  })
    .then((el) => {
      res.status(201).send({ message: "Produto atualizado com sucesso" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "Falha ao atualizar produto", data: err });
    });
};

// excuindo o profuto
exports.delete = (req, res, next) => {
  Product.findOneAndRemove(req.body.id)
    .then((el) => {
      res.status(201).send({ message: "Produto excluido com sucesso" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "Falha ao remover produto", data: err });
    });
};
