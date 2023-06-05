const express = require('express');
const router = require('./router');

const port = 8001
const app = express();

// On signale a express qu'il va lire un format complexe (formulaire)
app.use(express.urlencoded({extended: true}));
app.use(router);

// Initialisation du moteur pug
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
  });