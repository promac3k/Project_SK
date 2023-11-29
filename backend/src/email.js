const express = require("express")
const router = express()

let users = []

router.set("view-engine", "ejs")
router.use(express.urlencoded({ extended: false }))

router.post("/contact", (req, res) => {

    res.send("dgdgdfg")
    user_email = req.body.email
    user_cabecalho = req.body.cabecalho
    user_mensagem = req.body.text_mail
    console.log(req.body.email)
});
// nao sei porque que nao funcionnou 
module.exports = router