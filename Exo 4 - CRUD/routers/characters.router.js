const CharactersController = require('../controllers/characters.controller');

// Création du routeur pour les routes characters
const characterRouter = require('express').Router();

// Route qui va récupérer TOUT les personnages
characterRouter.get('/', CharactersController.getAll);

// Route qui va ajouter de nouveaux personnages
characterRouter.post('/', CharactersController.add);

// Route qui va récupérer un personnage par rapport à son ID
characterRouter.get('/:id([0-9]+)', CharactersController.getById);

// Route qui va modifier un personnage par rapport à son ID
characterRouter.put('/:id([0-9]+)', CharactersController.update);

// Route qui va supprimer un personnage par rapport à son ID
characterRouter.delete('/:id([0-9]+)', CharactersController.delete);

module.exports = characterRouter;