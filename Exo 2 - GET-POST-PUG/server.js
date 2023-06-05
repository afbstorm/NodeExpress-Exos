// On charge le fichier .env le plus tôt possible
require('dotenv').config();

// Déstructuring de la variable d'environnement
const { PORT, MSG } = process.env;

const express = require('express');
const path = require('path'); // Va servir a utiliser des chemins spécifiques avec express

const app = express();

// Mise en place du templating via PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Permet à express d'utiliser les fichiers static situés dans le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Permet à Express de traduire les chaines de caractères renvoyées par une requête POST ou PUT et en object Javascript. Le extended true permet d'utiliser la bibliothèqye 'qs' permet de lire les array / object reçu depuis un formulaire
app.use(express.urlencoded({extended: true}));

app.use(express.json());

const router = require('./routers/router');
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});

// TODO Exercice :
// Ajouter les pages pour la gestion des produits
// - Une page avec la liste des produits
//   Elle affiche le nom et le prix de chaque produit avec un lien vers la page detail.
// - Une page avec le detail d'un produit
//   Elle affiche toutes les données d'un produit avec son image.