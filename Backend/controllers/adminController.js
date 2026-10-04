const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const {
  validateEmail,
  validateName,
  validateAddress,
  validatePassword,
} = require("../utils/validators");

// =========================
// ADMIN DASHBOARD
// =========================
const getDashboard = async (req, res) => {
  try {
    const [[users]] = await pool.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[stores]] = await pool.query(
      "SELECT COUNT(*) AS totalStores FROM stores"
    );

    const [[ratings]] = await pool.query(
      "SELECT COUNT(*) AS totalRatings FROM ratings"
    );

    res.json({
      success: true,
      data: {
        totalUsers: users.totalUsers,
        totalStores: stores.totalStores,
        totalRatings: ratings.totalRatings,
      },
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};

// =========================
// ADD USER / ADMIN
// =========================
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role = "user",
    } = req.body;

    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either user or admin",
      });
    }

    if (!validateName(name)) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 20 and 60 characters",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (!validateAddress(address)) {
      return res.status(400).json({
        success: false,
        message: "Address must not exceed 400 characters",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters and contain at least one uppercase letter and one special character",
      });
    }

    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users
       (name, email, password, address, role)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, address, role]
    );

    res.status(201).json({
      success: true,
      message: `${role} created successfully`,
      userId: result.insertId,
    });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

// =========================
// ADD STORE
// =========================
const createStore = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      ownerId,
    } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "Store name, email, address and ownerId are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid store email",
      });
    }

    if (!validateAddress(address)) {
      return res.status(400).json({
        success: false,
        message: "Address must not exceed 400 characters",
      });
    }

    const [owner] = await pool.query(
      "SELECT id, role FROM users WHERE id = ?",
      [ownerId]
    );

    if (owner.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    if (owner[0].role !== "owner") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a store owner",
      });
    }

    const [existingStore] = await pool.query(
      "SELECT id FROM stores WHERE email = ?",
      [email]
    );

    if (existingStore.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Store email already exists",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO stores
       (name, email, address, owner_id)
       VALUES (?, ?, ?, ?)`,
      [name, email, address, ownerId]
    );

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      storeId: result.insertId,
    });
  } catch (error) {
    console.error("CREATE STORE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create store",
    });
  }
};

// =========================
// GET USERS
// =========================
const getUsers = async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      address = "",
      role = "",
      sortBy = "name",
      order = "ASC",
    } = req.query;

    const allowedSortFields = {
      name: "u.name",
      email: "u.email",
      address: "u.address",
      role: "u.role",
      created_at: "u.created_at",
    };

    const sortColumn = allowedSortFields[sortBy] || "u.name";
    const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    let query = `
      SELECT
        u.id,
        u.name,
        u.email,
        u.address,
        u.role,
        u.created_at
      FROM users u
      WHERE 1 = 1
    `;

    const params = [];

    if (name) {
      query += " AND u.name LIKE ?";
      params.push(`%${name}%`);
    }

    if (email) {
      query += " AND u.email LIKE ?";
      params.push(`%${email}%`);
    }

    if (address) {
      query += " AND u.address LIKE ?";
      params.push(`%${address}%`);
    }

    if (role) {
      query += " AND u.role = ?";
      params.push(role);
    }

    query += ` ORDER BY ${sortColumn} ${sortOrder}`;

    const [users] = await pool.query(query, params);

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// =========================
// GET STORES - ADMIN
// =========================
const getAdminStores = async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      address = "",
      sortBy = "name",
      order = "ASC",
    } = req.query;

    const allowedSortFields = {
      name: "s.name",
      email: "s.email",
      address: "s.address",
      rating: "overall_rating",
    };

    const sortColumn =
      allowedSortFields[sortBy] || "s.name";

    const sortOrder =
      order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    let query = `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        s.owner_id,
        COALESCE(ROUND(AVG(r.rating), 2), 0) AS overall_rating
      FROM stores s
      LEFT JOIN ratings r
        ON s.id = r.store_id
      WHERE 1 = 1
    `;

    const params = [];

    if (name) {
      query += " AND s.name LIKE ?";
      params.push(`%${name}%`);
    }

    if (email) {
      query += " AND s.email LIKE ?";
      params.push(`%${email}%`);
    }

    if (address) {
      query += " AND s.address LIKE ?";
      params.push(`%${address}%`);
    }

    query += `
      GROUP BY
        s.id,
        s.name,
        s.email,
        s.address,
        s.owner_id
      ORDER BY ${sortColumn} ${sortOrder}
    `;

    const [stores] = await pool.query(query, params);

    res.json({
      success: true,
      count: stores.length,
      stores,
    });
  } catch (error) {
    console.error("GET ADMIN STORES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stores",
    });
  }
};

// =========================
// GET USER DETAILS
// =========================
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const [users] = await pool.query(
      `SELECT
        id,
        name,
        email,
        address,
        role,
        created_at
       FROM users
       WHERE id = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    let stores = [];

    if (user.role === "owner") {
      const [ownerStores] = await pool.query(
        `SELECT
          s.id,
          s.name,
          s.email,
          s.address,
          COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating
         FROM stores s
         LEFT JOIN ratings r
           ON s.id = r.store_id
         WHERE s.owner_id = ?
         GROUP BY
           s.id,
           s.name,
           s.email,
           s.address`,
        [id]
      );

      stores = ownerStores;
    }

    res.json({
      success: true,
      user,
      stores,
    });
  } catch (error) {
    console.error("GET USER DETAILS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
    });
  }
};

module.exports = {
  getDashboard,
  createUser,
  createStore,
  getUsers,
  getAdminStores,
  getUserDetails,
};