const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM hormones"
    );
    res.render("transition/transition", {
        rows: result.rows
    });
});

router.get("/hormone-input", (req, res) => {
    res.render("transition/hormone-input");
});

router.post("/hormone-input", async (req, res) => {
    await pool.query(
        "INSERT INTO hormones (date, estrogen, testosterone) VALUES ($1, $2, $3)", [req.body.date, req.body.estrogen, req.body.testosterone]
    );
    res.redirect("/transition");
});

module.exports = router;