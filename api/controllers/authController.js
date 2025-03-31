const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User")

exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "Cet email est déjà utilisé"});
        }


        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer et enregistrer l'utilisateur
        const user = await User.create({name, email, password: hashedPassword});

        // Générer un token JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        // Envoyer le token dans un cookie HTTP-Only
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
            sameSite: "Strict" // Protection contre les attaques CSRF
        });

        // Répondre avec les informations utilisateur (sans mot de passe)
        res.status(201).json({
            message: "Utilisateur créé et connecté avec succès !",
            user: {id: user._id, name: user.name, email: user.email}
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur serveur", err});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // if user already exists
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Utilisateur introuvable"})

        // verify password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Mot de passe incorrect"})

        // generate Token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        // Send token in cookie HttpOnly
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "Strict" // protect against CSRF attacks
        });

        res.json({
            message: "Connexion réussie !",
            user: {id: user._id, name: user.name, email: user.email}
        });
    } catch (err) {
        res.status(500).json({message: "Erreur serveur", err})
    }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        res.json({message: "Déconnexion réussie !"});
    } catch (err) {
        res.status(500).json({message: "Erreur serveur", err});
    }
};
