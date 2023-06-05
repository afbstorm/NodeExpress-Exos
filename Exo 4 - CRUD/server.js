const express = require('express');

// Initialisation d'express
const app = express();

// Instructions pour dire à express de lire du json
app.use(express.json());

const router = require('./routers/router');
// Création de la route /api qui va utiliser la route router
app.use('/api', router);

app.listen(8001, () => {
    console.log('Server is running on port 8001');
})