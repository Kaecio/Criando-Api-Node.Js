"use strict";

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.create = async () => {
  const resp = new Order.find({});
  return resp;
};

exports.create = async (data) => {
  const order = new Order(data);
  await order.save();
};
