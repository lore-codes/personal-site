const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/transition", async (req, res) => {
    const hormoneData = await pool.query(
        "SELECT * FROM hormones"
    );
    const taskData = await pool.query(
        "SELECT * FROM transition_tasks"
    );
    console.log("We only made it this far");
    res.json({
        hormoneData: hormoneData,
        taskData: taskData
    });
});

module.exports = router;