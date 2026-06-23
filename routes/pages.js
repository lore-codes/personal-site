const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/site-agenda", (req, res) => {
    res.render("site-agenda");
});

module.exports = router;