const express = require('express');

// Création du serveur
const app = express();

//Middleware "application-level" ( qui s'effectuera a chaque requête de l'application)
const middlewareApp = (req, res, next) => {
    const url = req.url;
    const now = new Date().toLocaleDateString('fr-be');

    console.log(`Requête effectuée sur : ${url} à ${now}`);
    next();
};

app.use(middlewareApp);

// Middleware "Router-level"
const middlewareRouter = (req, res, next) => {
    console.log('Middleware router était ici');
    next();
}

// Ajout du router
const router = express.Router();
app.use(router);

router.get('/', middlewareRouter, middlewareRouter, (req, res) => {
    console.log('On traite la route /');
    res.send('<h1>Hello World</h1>')
});

router.get('/demo', middlewareRouter, (req, res) => {
    console.log('Traitement de la requête')
    throw new Error('CA VA PETÉ !')
})

// middleware 'Error-handling' -> Va renvoyer aux users un message d'erreur
const middlewareError = (error, req, res, next) => {
    console.log('Traitement de l\erreur : ', error.message);

    if (res.headerSent) {
        return next(error);
    }

    res.status(500).send('<h1>Une erreur s\'est produite</h1>');
}

app.use(middlewareError);





// Demarrage du server
app.listen(8001, () => {
    console.log('Server up on port 8001');
});