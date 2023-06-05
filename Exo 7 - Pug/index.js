// Importation des modules
const express = require('express');
const path = require('path'); // Va servir a utiliser des chemins spécifiques avec express
const products = require('./datas/products.json');

const port = 8001;
// Initialisation de l'app
const app = express();

// Initilisation du moteur de templating de pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Permet à express d'utiliser les fichiers static situés dans le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Récupère à l'index de l'application le rendu du fichier index avec les produits du products.json
app.get('/', (req, res) => {
  res.render('index', { products: products });
});

app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});