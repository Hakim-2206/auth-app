require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//cookies
app.use(cookieParser())
// middlewares
app.use(express.json());
app.use(cors());

// mongodb conexion
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connecté"))
    .catch((err) => console.log("Erreur MongoDB:", err))

const authRoutes = require("./routes/authRoutes")

app.use("/api/auth", authRoutes)

// route test
app.get("/", (req,res) => {
    res.send("Bienvenue sur notre API d'authentification !")
});

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`))