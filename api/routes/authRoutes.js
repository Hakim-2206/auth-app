const express = require("express")
const {register, login} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", authMiddleware, async (req,res) => {
    res.json({message: "Bienvenue dans l'espace protégé !", userId: req.user.id})
})

module.exports = router;