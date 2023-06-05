const HomeController = {

    index: (req, res) => {

        //Création de la date actuelle
        const date = new Date();
        // Transformation de la date en date au format belge - long
        const dateOfDay = date.toLocaleDateString('fr-be');

        // Création de l'array d'objects people
        const people = [
            {firstname: "Zaza", lastname: "Vanderquack"},
            {firstname: "Della", lastname: "Duck"},
            {firstname: "Balthazar", lastname: "Picsou"},
        ];

        // Rendering de la page index -> en transmettant les objects nécessaires
        res.render('home/index', {dateOfDay, people});
    },

    contact_GET: (req, res) => {
        res.render('home/contact', {
            data: {},
            errors: {}
        });
    },

    contact_POST: (req, res) => {

        // Récupération des données du formulaire
        const { pseudo, message } = req.body

        const pseudoNotValid = !pseudo || pseudo.length < 2;
        const messageNotValid = !message;

        if (pseudoNotValid || messageNotValid) {
            res.render('home/contact', {
                errors: {
                    pseudo: pseudoNotValid,
                    message: messageNotValid,
                },
                data: {
                    pseudo, 
                    message
                }
            })

            return;
        }
         // Traitement -> Par exemple: stockage en DB
         console.log(`MESSAGE ${pseudo} : ${message}`);

         res.redirect('/');
    },

}

module.exports = HomeController;