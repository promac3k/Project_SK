const mysql = require("mysql2/promise")
const { router } = require("../user")

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "db_teste"
})

router.get("/login", async (req, res) => {
    try {
        const [rows, fields] = await connection.query("SELECT * FROM users")
        res.status(200).send(rows)
        console.log(rows)
    } catch {
        res.status(500).send()
        console.log("erro")
    }
})

module.exports = connection