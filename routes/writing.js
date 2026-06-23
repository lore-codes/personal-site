const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", (req, res) => {
    res.render("writing/writing");
});

router.get("/character/:character_id", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM characters WHERE character_id = $1", [req.params.character_id]
    );
    console.log(result.rows[0].character_name);
    res.render("writing/character", {
        character: result.rows[0]
    });
});

router.get("/character-creator", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM stories"
    );
    res.render("writing/character-creator", {
        stories: result.rows
    });
});

router.post("/character-creator", async (req, res) => {
    await pool.query(
        "INSERT INTO characters (character_name, story_name) VALUES ($1, $2)", [req.body.character, req.body.story]
    );
    const result = await pool.query(
        "SELECT character_id FROM characters WHERE character_name = $1", [req.body.character]
    );
    const id = await result.rows[0].character_id;
    console.log(id);
    res.redirect("/writing/character/" + id);
});

router.get("/characters", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM characters"
    );
    res.render("writing/characters", {
        characters: result.rows
    });
})

module.exports = router;