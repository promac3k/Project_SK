const express = require("express");
const router = require("./router");

const app = express();

// Serve static files from the "www" directory
app.use(express.static("www"));

app.use(router);

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

module.exports = app;