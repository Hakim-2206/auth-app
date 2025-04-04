require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// config cors
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

//cookies
app.use(cookieParser())
// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// mongodb conexion
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connecté"))
    .catch((err) => console.log("Erreur MongoDB:", err))

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

app.use("/api/auth", authRoutes)
app.use("/api/profile", userRoutes)

// route test
app.get("/", (req, res) => {
    res.send("Bienvenue sur notre API d'authentification !")
});

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Serveur lancé sur le port ${PORT}`))