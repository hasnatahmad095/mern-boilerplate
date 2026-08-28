const express = require("express");

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/item.controller");

const router = express.Router();

router.route("/").get(getItems).post(createItem);
router.route("/:id").get(getItem).patch(updateItem).delete(deleteItem);

module.exports = router;
