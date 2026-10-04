const express = require("express");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful",
    user: req.user,
  });
});

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted",
      user: req.user,
    });
  }
);

module.exports = router;