"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/:slug', controller.getBySlug);
router.get('/:tag', controller.getByTag);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.delete);

module.exports = router;
