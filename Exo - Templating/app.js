// Importation des modules st4
const ejs = require('ejs');
const fs = require('fs');
const http = require('http');

//Création du serveur st5
const server = http.createServer();

//Lancement du serveur st5
server.listen(8001, () => {
    console.log('Server is running...');
});

//Lecture du templating st7
const body = fs.readFileSync(__dirname+'/views/index.ejs', 'utf-8');

//Initialisation du rendering + transmissions du contenu st8
let bodyRender = ejs.render(body, {titreForm : 'Contact us', promotionGroup: 'Formation Web Mobile'});

//Création de la vue server-side st9
const bRender = (req, res) => {
    res.writeHead(200, {
        // Envoie des données de taille de fichier au serveur en byte - Buffer permet de donner à node une façon de lire les datas en binaires
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/html'
    });
    res.end(bodyRender);
};

//Envoi de la vue au serveur st10
server.on('request', bRender);
  