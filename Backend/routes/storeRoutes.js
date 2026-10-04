const express = require("express");

const {
  getStores,
} = require("../controllers/storeController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("user"),
  getStores
);

module.exports = router;