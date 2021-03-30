"use strict";

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.get = async (data) => {
  const resp = Order.find({}, "number status create")
    .populate("customer")
    .populate("items.product");
  return resp;
};

exports.create = async (data) => {
  const order = new Order(data);
  await order.save();
};
