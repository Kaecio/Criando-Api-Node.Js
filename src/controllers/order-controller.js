'use strict';

const repository = require("../repositories/order-repository");
const guid = require('guid');

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
    console.log(data)
  } catch (error) {
    console.log('caiu no catch')
    res.status(500).send({ message: "Falha ao processar a sua requisição1" });
  }
};

exports.post = async (req, res, next) => {
    try {
      await repository.create({
        customer:req.body.customer,
        number:guid.raw().substring(0, 6),
        item: req.body.item
      });
      res.status(201).send({ message: "Peido codastrado com sucesso" });
    } catch (error) {
        console.error("caiu no error")
      res
        .status(400)
        .send({ message: "Falha ao cadastrar pedido" });
    }
  };

