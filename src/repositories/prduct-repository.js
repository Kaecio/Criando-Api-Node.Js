"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = async () => {
  const res = await Product.find({ active: true }, "title price slug tags");
  return res;
};

exports.getBySlug = async (slug) => {
  const res = await Product.findOne(
    { slug: slug, active: true },
    "title description price slug tags"
  );
  return res;
};

exports.getById = async (id) => {
  const res = await Product.findById(id);
  return res;
};

exports.getByTag = async (tags) => {
  const res = await Product.find({ tags: tags, active: true });
  return res;
};

exports.create = (data) => {
  const product = new Product(data);
  return product.save();
};

exports.update = async (id, data) => {
  const res = await Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug,
    },
  });
  return res;
};

exports.delete = async (id) => {
  const res = await Product.findOneAndRemove(id);
  return res;
};
