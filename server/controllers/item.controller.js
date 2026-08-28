const Item = require("../models/Item");

// GET /api/items
async function getItems(req, res, next) {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

// GET /api/items/:id
async function getItem(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

// POST /api/items
async function createItem(req, res, next) {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ success: true, message: "Item created", data: item });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/items/:id
async function updateItem(req, res, next) {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, message: "Item updated", data: item });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/items/:id
async function deleteItem(req, res, next) {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, message: "Item deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
