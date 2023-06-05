// Importation des modules
const express = require('express');
const RegisterController = require('./register.controller');

// Initialisation du router d'expressjs
const router = express.Router();

// Création d'une route post -> On y indique le controller OU on y écrit directement ce qu'on veut faire sur la route
router.post('/register', RegisterController.register);

module.exports = router;