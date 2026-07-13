const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("programming/programming");
});

router.get("/random-color", (req, res) => {
    res.render("programming/random-color");
});

router.get("/clue-scorecard", (req, res) => {
    res.render("programming/clue-scorecard");
});

module.exports = router;