const characterRouter = require('./characters.router');

const router = require('express').Router();

// Création de la route /character affiliée au router characterRouter
router.use('/character', characterRouter);

module.exports = router;