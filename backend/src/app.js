const express = require("express");
const router = require("./router");
const users = require("./user");

const app = express();
app.use(express.json()); 

// Serve static files from the "www" directory
app.use(express.static("www"))

app.use("/user", users)


app.get("/", (req, res) => {
    res.redirect("/login.html")
});

app.listen(3000);

module.exports = app;