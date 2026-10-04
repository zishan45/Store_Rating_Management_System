const express = require("express");

const {
  getDashboard,
  createUser,
  createStore,
  getUsers,
  getAdminStores,
  getUserDetails,
} = require("../controllers/adminController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// All admin routes require admin authentication
router.use(authenticate, authorize("admin"));

// Dashboard
router.get("/dashboard", getDashboard);

// Create normal user / admin
router.post("/users", createUser);

// Get users with filters and sorting
router.get("/users", getUsers);

// Get specific user details
router.get("/users/:id", getUserDetails);

// Create store
router.post("/stores", createStore);

// Get stores with filters and sorting
router.get("/stores", getAdminStores);

module.exports = router;