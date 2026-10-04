const pool = require("../config/db");

const getStores = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const searchTerm = `%${search}%`;

    const [stores] = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(ROUND(AVG(r.rating), 2), 0) AS overall_rating,
        COALESCE(
          MAX(
            CASE
              WHEN r.user_id = ? THEN r.rating
            END
          ),
          0
        ) AS user_rating
      FROM stores s
      LEFT JOIN ratings r
        ON s.id = r.store_id
      WHERE s.name LIKE ?
         OR s.address LIKE ?
      GROUP BY s.id, s.name, s.email, s.address
      ORDER BY s.name ASC
      `,
      [req.user.id, searchTerm, searchTerm]
    );

    res.status(200).json({
      success: true,
      count: stores.length,
      stores,
    });
  } catch (error) {
    console.error("GET STORES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stores",
    });
  }
};

module.exports = {
  getStores,
};