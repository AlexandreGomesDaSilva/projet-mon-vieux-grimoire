const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://alexgds92:snkha7BLEdb@firstcluster.49re8.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Erreur de connexion à MongoDB :", error));

module.exports = mongoose;
