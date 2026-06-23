const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/transition", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM hormones"
    );
    res.json(result.rows);
});

module.exports = router;