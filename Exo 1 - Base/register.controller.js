// Importation des modules
const bcrypt = require('bcrypt'); // Bibliothèque externe permettant de crypter (hasher) quelque chose
const RegisterModel = require('./register.model');

const RegisterController = {
    register: async (req, res) => {

        // Destructuring de l'objet body de la req(uête)
        const {email, password, username, age} = req.body;

        // Début de la transaction
        try {
            // On hash le password selon un certain degré de complexité (ici 10)
            const hashedPassword = bcrypt.hashSync(password, 10);
        
            //On appelle le modèle qui va servir a contacter la DB
            const newUser = RegisterModel.register({email, hashedPassword, username, age});

            // On vérifie que la transaction a été effectuée et on l'indique via le code status 200
            if(newUser) {
                res.status(200).send(newUser);
            }

            // Si erreur, on récupère les datas et on envoie le msg d'erreur code status 500
        } catch(err) {
            console.error(err)
            res.status(500).send('Server error');
        }
    }   
};

module.exports = RegisterController;