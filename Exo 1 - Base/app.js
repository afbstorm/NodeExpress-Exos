// Importation des modules
const express = require('express');
const router = require('./register.router');

// Initialisation d'express
const app = express();

// Définition du port serveur
const port = 8001;

// Indication à express de traduire les formats JSON
app.use(express.json());

// Indication à express d'utiliser le router qu'on à créé
app.use(router);

// Lancement du serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})