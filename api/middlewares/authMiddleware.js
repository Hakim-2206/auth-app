const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Vérifier si le cookie contient le token
    const token = req.cookies.token; // Récupérer le token depuis les cookies

    if (!token) {
        return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    try {
        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Ajouter l'info de l'utilisateur à la requête
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;
