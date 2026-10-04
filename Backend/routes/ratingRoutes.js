const express = require("express");

const {
  submitRating,
  updateRating,
} = require("../controllers/ratingController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("user"),
  submitRating
);

router.put(
  "/:storeId",
  authenticate,
  authorize("user"),
  updateRating
);

module.exports = router;