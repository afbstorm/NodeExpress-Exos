const characters = require('../data/characters.json');

// On va chercher le DERNIER id de l'array characters
let lastCharacterId = Math.max(...characters.map(c => c.id));

//Création du controller 
const CharactersController = {

    getAll: (req, res) => {
        //Préparation des datas
        const data = characters.map(c => ({
            id: c.id,
            firstname: c.firstname,
            lastname: c.lastname
        }));

        // Envoie des données sous JSON
        console.log(data);
        res.json(data);
    },

    getById: (req, res) => {
        // Récupération de l'ID dans l'url (param) - parseInt pour le transformer en number
        const id = parseInt(req.params.id); 

        // Récupération du personnage a envoyer selon l'id - gràce à la transformation en number on peut faire une égalité stricte
        const character = characters.find(c => c.id === id);

        // Envoie d'une erreur 404 si aucun personnage n'a cet id
        if (!character) {
            res.sendStatus(404);
            return;
        }

        // Envoi du personnage récupéré
        res.json(character);
    },

    add: (req, res) => {

        // Best pratice -> Ajouter une étape de validation de donnée
        console.log(' - Donnée recue : ', req.body);

        //Incrémentation de l'objet à ajouter
        lastCharacterId++;

        //Création de l'object à ajouter
        const data = {
            id: lastCharacterId,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            serie: req.body.serie,
        };

        console.log(data)
        // Ajout des données dans la collection de personnage
        characters.push(data);

        // Envoi d'une réponse indiquant la réussite 
        res.location('/api/character/' + data.id);
        // Envoi d'un code de succès et les datas
        res.status(201).json(data);
    },

    update: (req, res) => {
        // Récupération de l'ID dans l'url (param) - parseInt pour le transformer en number
        const id = parseInt(req.params.id); 

        // Récupération du personnage a envoyer selon l'id - gràce à la transformation en number on peut faire une égalité stricte
        const character = characters.find(c => c.id === id);

        // Envoie d'une erreur 404 si aucun personnage n'a cet id
        if (!character) {
            res.sendStatus(404);
            return;
        }

        // Modification de l'objet
        const updatedCharacter = {...character, firstname: req.body.firstname, lastname: req.body.lastname, serie: req.body.serie}


        // Envoi d'une réponse indiquant la réussite 
        res.location('/api/character/' + id);
        // Envoi d'un code de succès et les datas
        res.status(201).json(updatedCharacter);
    },

    delete: (req, res) => {

        // Récupération de l'ID dans l'url (param) - parseInt pour le transformer en number
        const id = parseInt(req.params.id); 

        // Récupération de l'index de l'élément
        const targetIndex = characters.findIndex(c => c.id === id);
        console.log(targetIndex);

        // Si l'élément n'existe pas 
        if (targetIndex === -1) {
            res.sendStatus(404);
            return;
        }

        // Suppression de l'élément ciblé
        characters.splice(targetIndex, 1);

        // Envoi de la réponse "No Content"
        res.sendStatus(204);
    }
}

module.exports = CharactersController;