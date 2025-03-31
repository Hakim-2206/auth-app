const express = require("express")
const {register, login, logout} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware")
const User = require("../models/User")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclure le password
        if (!user) return res.status(404).json({message: "Utilisateur non trouvé"});

        res.json(user);
    } catch (err) {
        res.status(500).json({message: "Erreur serveur", err});
    }
});

module.exports = router;