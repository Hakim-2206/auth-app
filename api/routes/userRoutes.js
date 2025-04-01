const express = require("express");
const router = express.Router();
const {updateProfile, deleteProfile} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({message: "Utilisateur non trouvé"})

        res.json(user)
    } catch (e) {
        res.status(500).json({message: "Erreur serveur", e})
    }
});

router.put("/me", authMiddleware, updateProfile)

router.delete("/me", authMiddleware, deleteProfile)

module.exports = router;