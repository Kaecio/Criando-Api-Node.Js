'use strict';

const repository = require("../repositories/order-repository");

exports.post = async (req, res, next) => {
    let validationProduct = new Validation();
    validationProduct.hasMinlen(
      req.body.name,
      3,
      "O nome deve conter pelo menos 3 caracteres"
    );
    validationProduct.isEmail(
      req.body.email,
      "O email é inválido"
    );
    validationProduct.hasMinlen(
      req.body.password,
      6,
      "O password deve conter pelo menos 6 caracteres"
    );
  
    if (!validationProduct.isValid()) {
      res.status(400).send(validationProduct.errors()).end();
      return;
    }
    console.log("saiu do if")
    try {
      await repository.create(req.body);
      res.status(201).send({ message: "Cliente codastrado com sucesso" });
    } catch (error) {
        console.error("caiu no error")
      res
        .status(400)
        .send({ message: "Falha ao cadastrar cliente" });
    }
  };

