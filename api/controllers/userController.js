const bcrypt = require("bcryptjs")
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        const {name, email, newPassword} = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({message: "Utilisateur non trouvé"})
        }

        if (name) user.name = name;

        if (email) {
            const existingUser = await User.findOne({email});
            if (existingUser && existingUser._id.toString() !== req.user.id) {
                return res.status(400).json({message: "Email deja utilisé"})
            }
            user.email = email;
        }
        if (newPassword && newPassword.trim() !== "") {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save()

        const updateUser = await User.findById(user._id).select("-password");
        res.json({
            message: "Profil mis à jour avec succès",
            user: updateUser,
        })
    } catch (err) {
        res.status(500).json({message: "Erreur serveur"})
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None"
        });

        res.json({message: "Compte supprimé avec succès"});

    } catch (e) {
        res.status(500).json({message: "Erreur serveur"})
    }
}