/**
 * Centralized error handler. Any error passed to next(err) lands here.
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack || err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(", ") });
  }

  // Invalid Mongo ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
}

module.exports = errorHandler;
