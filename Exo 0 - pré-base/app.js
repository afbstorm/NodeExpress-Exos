// Importation des modules
const express = require('express');

// Initialisation d'express
const app = express();

// Définition du port serveur
const port = 8001;

// Indication à express de traduire les formats JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.writeHead(200);
    res.end('Hello World');
});

app.get('/test', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('Formulaire ok');
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})