const express = require("express");
const app = express();
const pagesRouter = require("./routes/pages");
const programmingRouter = require("./routes/programming");
const transitionRouter = require("./routes/transition");
const writingRouter = require("./routes/writing");
const apiRouter = require("./routes/api");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/", pagesRouter);
app.use("/programming", programmingRouter);
app.use("/transition", transitionRouter);
app.use("/writing", writingRouter);
app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log("server running on port 3000")
});