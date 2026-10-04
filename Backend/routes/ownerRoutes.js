const express = require("express");

const {
  getOwnerDashboard,
  updateOwnerPassword,
} = require("../controllers/ownerController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Every owner route requires owner authentication
router.use(authenticate, authorize("owner"));

// Owner dashboard
router.get("/dashboard", getOwnerDashboard);

// Update password
router.put("/password", updateOwnerPassword);

module.exports = router;