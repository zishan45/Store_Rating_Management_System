const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const { validatePassword } = require("../utils/validators");

// =====================================
// OWNER DASHBOARD
// =====================================
const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Get stores owned by this owner
    const [stores] = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating,
        COUNT(r.id) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r
        ON s.id = r.store_id
      WHERE s.owner_id = ?
      GROUP BY
        s.id,
        s.name,
        s.email,
        s.address
      ORDER BY s.name ASC
      `,
      [ownerId]
    );

    // Get users who submitted ratings
    const [ratingUsers] = await pool.query(
      `
      SELECT
        r.id AS rating_id,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        s.id AS store_id,
        s.name AS store_name,
        r.rating,
        r.created_at
      FROM ratings r
      INNER JOIN users u
        ON r.user_id = u.id
      INNER JOIN stores s
        ON r.store_id = s.id
      WHERE s.owner_id = ?
      ORDER BY r.created_at DESC
      `,
      [ownerId]
    );

    res.json({
      success: true,
      data: {
        stores,
        ratingUsers,
      },
    });
  } catch (error) {
    console.error("OWNER DASHBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch owner dashboard",
    });
  }
};

// =====================================
// UPDATE OWNER PASSWORD
// =====================================
const updateOwnerPassword = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters and contain at least one uppercase letter and one special character",
      });
    }

    const [users] = await pool.query(
      "SELECT password FROM users WHERE id = ? AND role = 'owner'",
      [ownerId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Owner account not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      users[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      users[0].password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, ownerId]
    );

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("OWNER PASSWORD UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};

module.exports = {
  getOwnerDashboard,
  updateOwnerPassword,
};