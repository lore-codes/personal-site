const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("programming/programming");
});

router.get("/random-color", (req, res) => {
    res.render("programming/random-color");
});

module.exports = router;