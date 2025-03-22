const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://alexgds92:snkha7BLEdb@firstcluster.49re8.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Erreur de connexion à MongoDB :", error));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

module.exports = app;
