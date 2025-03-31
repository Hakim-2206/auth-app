const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User")

exports.register = async (req,res) => {
    try {
        const {name,email,password} = req.body;

        // if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({message: "Cet email est deja utilisé"})

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create & register user
        const user = await User.create({name,email,password: hashedPassword})
        res.status(201).json({message: "Utilisateur crée avec succés !"});
    } catch (err) {
        res.status(500).juson({message: "Erreur serveur", err})
    }
};

exports.login = async (req,res) => {
    try {
        const {email,password} = req.body;

        // if user already exists
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Utilisateur introuvable"})

        // verify password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Mot de passe incorrect"})

        // generate Token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        // Send token in cookie HttpOnly
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "Strict" // protect against CSRF attacks
        });

        res.json({message: "Connexion réussie !"});
    } catch (err) {
        res.status(500).json({message: "Erreur serveur", err})
    }
}